@echo off
echo Starting Mock Exam Server...
echo.
echo This will start a local web server and open your browser automatically.
echo The server allows the exam dropdown to work properly by serving files over HTTP.
echo.
echo Press Ctrl+C to stop the server when you're done.
echo.
pause

cd /d "%~dp0"
python server.py
