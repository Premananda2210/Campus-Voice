require('dotenv').config();
const express=require('express'),{Pool}=require('pg'),bcrypt=require('bcrypt'),jwt=require('jsonwebtoken'),
multer=require('multer'),cookie=require('cookie-parser'),cors=require('cors'),path=require('path'),{body,validationResult}=require('express-validator');
const app=express(),SECRET=process.env.JWT_SECRET||'dev';
const pool=new Pool({host:process.env.DB_HOST,port:process.env.DB_PORT||5432,user:process.env.DB_USER,password:process.env.DB_PASS,database:process.env.DB_NAME,ssl:/^(localhost|127\.0\.0\.1|)$/.test(process.env.DB_HOST||"")?false:{rejectUnauthorized:false}});
// Small wrapper: converts ? placeholders to $1,$2... and returns [rows] like mysql2
const db={execute:async(sql,p=[])=>{let i=0;const r=await pool.query(sql.replace(/\?/g,()=>'$'+(++i)),p);return[r.rows,r];}};
app.use(cors(),express.json(),cookie());
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
app.use(express.static(path.join(__dirname,'../frontend'),{setHeaders:(res,p)=>{if(p.endsWith('index.html'))res.setHeader('Cache-Control','no-store')}}));
// Upload: JPG/PNG/PDF only, max 5 files, 5MB each
const upload=multer({storage:multer.diskStorage({destination:path.join(__dirname,'uploads'),
 filename:(r,f,cb)=>cb(null,Date.now()+'-'+Math.round(Math.random()*1e6)+path.extname(f.originalname).toLowerCase())}),
 limits:{fileSize:5*1024*1024,files:5},
 fileFilter:(r,f,cb)=>cb(null,['image/jpeg','image/png','application/pdf'].includes(f.mimetype))});
// Auth middleware (role optional)
const auth=role=>(req,res,next)=>{try{const t=req.cookies.token||(req.headers.authorization||'').replace('Bearer ','');
 const u=jwt.verify(t,SECRET);if(role&&u.role!==role)return res.status(403).json({error:'Forbidden'});req.user=u;next();}
 catch{res.status(401).json({error:'Unauthorized'});}};
const valid=(req,res,next)=>{const e=validationResult(req);e.isEmpty()?next():res.status(400).json({error:e.array()[0].msg});};
const sign=(res,p)=>{const t=jwt.sign(p,SECRET,{expiresIn:'7d'});res.cookie('token',t,{httpOnly:true,sameSite:'lax',maxAge:6048e5});return t;};
const J=fn=>(req,res,next)=>fn(req,res,next).catch(e=>{console.error(e);res.status(500).json({error:'Server error'})});
// Auth APIs
app.post('/api/auth/signup',[body('email').isEmail(),body('password').isLength({min:8}).withMessage('Password min 8 chars'),
 body('full_name').trim().notEmpty(),body('student_id').trim().notEmpty()],valid,async(req,res)=>{
 const{student_id,full_name,department,semester,email,password}=req.body;
 try{await db.execute('INSERT INTO students(student_id,full_name,department,semester,email,password_hash) VALUES(?,?,?,?,?,?)',
  [student_id,full_name,department||null,semester||null,email,await bcrypt.hash(password,10)]);res.json({ok:true});}
 catch(e){res.status(409).json({error:'Student ID or email already registered'});}});
app.post('/api/auth/login',J(async(req,res)=>{
 const{email,password,admin}=req.body,tbl=admin?'admins':'students';
 const[[u]]=await db.execute(`SELECT * FROM ${tbl} WHERE email=?`,[email]);
 if(!u||u.disabled||!await bcrypt.compare(password,u.password_hash))return res.status(401).json({error:'Invalid credentials'});
 res.json({token:sign(res,{id:u.id,role:admin?'admin':'student'}),role:admin?'admin':'student'});}));
app.post('/api/auth/logout',(req,res)=>{res.clearCookie('token');res.json({ok:true});});
app.get('/api/auth/profile',auth('student'),J(async(req,res)=>{
 const[[u]]=await db.execute('SELECT id,student_id,full_name,department,semester,email,phone FROM students WHERE id=?',[req.user.id]);res.json(u);}));
app.put('/api/auth/profile',auth('student'),J(async(req,res)=>{
 const{full_name,department,semester,phone}=req.body;
 await db.execute('UPDATE students SET full_name=?,department=?,semester=?,phone=? WHERE id=?',[full_name,department,semester,phone,req.user.id]);res.json({ok:true});}));
// Complaints
const notify=(sid,cid,msg,admin=0)=>db.execute('INSERT INTO notifications(student_id,for_admin,complaint_id,message) VALUES(?,?,?,?)',[sid,admin,cid,msg]);
app.post('/api/complaints',auth('student'),upload.array('files',5),
 [body('title').trim().notEmpty(),body('description').trim().notEmpty()],valid,J(async(req,res)=>{
 const b=req.body,[r]=await db.execute('INSERT INTO complaints(student_id,title,description,category,priority,location,incident_date,anonymous) VALUES(?,?,?,?,?,?,?,?) RETURNING id',
  [req.user.id,b.title,b.description,b.category,b.priority||'Medium',b.location,b.incident_date||null,b.anonymous==='true'?1:0]);
 const cid='CV'+new Date().getFullYear()+String(r[0].id).padStart(4,'0');
 await db.execute('UPDATE complaints SET complaint_id=? WHERE id=?',[cid,r[0].id]);
 for(const f of req.files||[])await db.execute('INSERT INTO complaint_images(complaint_id,image_path) VALUES(?,?)',[r[0].id,'/uploads/'+f.filename]);
 await notify(req.user.id,r[0].id,`Complaint ${cid} submitted`);
 if(['High','Urgent'].includes(b.priority))await notify(null,r[0].id,`${b.priority} complaint ${cid}`,1);
 res.json({complaint_id:cid});}));
app.get('/api/complaints',auth('student'),J(async(req,res)=>{
 const[rows]=await db.execute('SELECT * FROM complaints WHERE student_id=? ORDER BY created_at DESC',[req.user.id]);res.json(rows);}));
app.get('/api/complaints/:id',auth(),J(async(req,res)=>{
 const[[c]]=await db.execute('SELECT c.*,s.full_name,s.department FROM complaints c JOIN students s ON s.id=c.student_id WHERE c.complaint_id=?',[req.params.id]);
 if(!c||(req.user.role==='student'&&c.student_id!==req.user.id))return res.status(404).json({error:'Not found'});
 if(req.user.role==='admin'&&c.anonymous){c.full_name='Anonymous';c.student_id=null;}
 const[imgs]=await db.execute('SELECT image_path FROM complaint_images WHERE complaint_id=?',[c.id]);res.json({...c,images:imgs});}));
app.delete('/api/complaints/:id',auth('student'),J(async(req,res)=>{
 await db.execute("DELETE FROM complaints WHERE complaint_id=? AND student_id=? AND status='Pending'",[req.params.id,req.user.id]);res.json({ok:true});}));
// Admin
app.get('/api/admin/complaints',auth('admin'),J(async(req,res)=>{
 const[rows]=await db.execute(`SELECT c.complaint_id,c.title,c.category,c.priority,c.status,c.anonymous,c.created_at,
  CASE WHEN c.anonymous=1 THEN 'Anonymous' ELSE s.full_name END student_name,s.department FROM complaints c JOIN students s ON s.id=c.student_id ORDER BY c.created_at DESC`);res.json(rows);}));
app.put('/api/admin/status/:id',auth('admin'),J(async(req,res)=>{
 const{status,remark}=req.body;
 await db.execute('UPDATE complaints SET status=?,admin_remark=COALESCE(?,admin_remark),updated_at=NOW() WHERE complaint_id=?',[status,remark||null,req.params.id]);
 const[[c]]=await db.execute('SELECT id,student_id FROM complaints WHERE complaint_id=?',[req.params.id]);
 await notify(c.student_id,c.id,`Complaint ${req.params.id} is now ${status}`);res.json({ok:true});}));
app.get('/api/admin/stats',auth('admin'),J(async(req,res)=>{
 const[[s]]=await db.execute(`SELECT COUNT(*)::int total,COALESCE(SUM((status='Pending')::int),0)::int pending,COALESCE(SUM((status='In Review')::int),0)::int review,COALESCE(SUM((status='Resolved')::int),0)::int resolved,
  COALESCE(SUM((priority IN('High','Urgent'))::int),0)::int high,COALESCE(SUM(anonymous),0)::int anon FROM complaints`);res.json(s);}));
app.get('/api/admin/users',auth('admin'),J(async(req,res)=>{
 const[r]=await db.execute('SELECT s.id,s.full_name,s.student_id,s.department,s.semester,s.email,s.disabled,COUNT(c.id)::int complaints FROM students s LEFT JOIN complaints c ON c.student_id=s.id GROUP BY s.id');res.json(r);}));
app.put('/api/admin/users/:id',auth('admin'),J(async(req,res)=>{await db.execute('UPDATE students SET disabled=? WHERE id=?',[req.body.disabled?1:0,req.params.id]);res.json({ok:true});}));
app.delete('/api/admin/users/:id',auth('admin'),J(async(req,res)=>{await db.execute('DELETE FROM students WHERE id=?',[req.params.id]);res.json({ok:true});}));
// Student stats + notifications
app.get('/api/stats',auth('student'),J(async(req,res)=>{
 const[[s]]=await db.execute(`SELECT COUNT(*)::int total,COALESCE(SUM((status='Pending')::int),0)::int pending,COALESCE(SUM((status='In Review')::int),0)::int review,COALESCE(SUM((status='Resolved')::int),0)::int resolved FROM complaints WHERE student_id=?`,[req.user.id]);res.json(s);}));
app.get('/api/notifications',auth(),J(async(req,res)=>{
 const[r]=req.user.role==='admin'?await db.execute('SELECT * FROM notifications WHERE for_admin=1 ORDER BY id DESC LIMIT 30')
  :await db.execute('SELECT * FROM notifications WHERE student_id=? ORDER BY id DESC LIMIT 30',[req.user.id]);res.json(r);}));
app.put('/api/notifications/read',auth(),J(async(req,res)=>{
 req.user.role==='admin'?await db.execute('UPDATE notifications SET read_status=1 WHERE for_admin=1'):await db.execute('UPDATE notifications SET read_status=1 WHERE student_id=?',[req.user.id]);res.json({ok:true});}));
// Reports (admin analytics)
app.get('/api/admin/reports',auth('admin'),J(async(req,res)=>{
 const q=async sql=>(await db.execute(sql))[0];
 res.json({category:await q('SELECT category k,COUNT(*)::int n FROM complaints GROUP BY category'),
  department:await q('SELECT s.department k,COUNT(*)::int n FROM complaints c JOIN students s ON s.id=c.student_id GROUP BY s.department'),
  priority:await q('SELECT priority k,COUNT(*)::int n FROM complaints GROUP BY priority'),
  status:await q('SELECT status k,COUNT(*)::int n FROM complaints GROUP BY status'),
  monthly:await q("SELECT to_char(created_at,'YYYY-MM') k,COUNT(*)::int n FROM complaints GROUP BY k ORDER BY k")});}));
// CLI: node backend/server.js --seed-admin email password
const i=process.argv.indexOf('--seed-admin');
if(i>0){(async()=>{await db.execute('INSERT INTO admins(email,password_hash) VALUES(?,?)',[process.argv[i+1],await bcrypt.hash(process.argv[i+2],10)]);console.log('Admin created');process.exit();})();}
else app.listen(process.env.PORT||3000,()=>console.log('Campus Voice on http://localhost:'+(process.env.PORT||3000)));
