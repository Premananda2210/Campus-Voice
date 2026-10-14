// Serverless entry (Vercel): reuses the Express app without listening.
const app = require("../backend/server.js");

module.exports = app;
