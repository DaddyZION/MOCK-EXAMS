# Mock Exam Server - PowerShell Script
# This script starts a local HTTP server for the mock exam website

Write-Host "🚀 Starting Mock Exam Server..." -ForegroundColor Green
Write-Host ""
Write-Host "This will start a local web server and open your browser automatically." -ForegroundColor Cyan
Write-Host "The server allows the exam dropdown to work properly by serving files over HTTP." -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the server when you're done." -ForegroundColor Yellow
Write-Host ""
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Get the directory where this script is located
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $scriptPath

# Start the Python server
try {
    python server.py
}
catch {
    Write-Host "❌ Error starting server: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Make sure Python is installed and available in your PATH." -ForegroundColor Yellow
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}
