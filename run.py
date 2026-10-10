"""Run the Campus Voice site:  python run.py  ->  http://localhost:3100"""
import os
import subprocess
import sys

os.environ.setdefault("PORT", "3100")
sys.exit(
    subprocess.call(
        ["node", "backend/server.js"],
        cwd=os.path.dirname(os.path.abspath(__file__)),
    )
)
