#!/usr/bin/env python3
"""
Simple HTTP server to serve the mock exam website locally.
This allows the JavaScript to properly fetch exam files due to CORS policies.
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

# Configuration
PORT = 8000
DIRECTORY = Path(__file__).parent

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Add CORS headers to allow local file access
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def log_message(self, format, *args):
        # Custom logging to reduce noise from connection errors
        message = format % args
        # Only log successful requests and important errors
        if not any(error in message for error in ['ConnectionAbortedError', 'ConnectionResetError']):
            super().log_message(format, *args)
    
    def handle_one_request(self):
        """Handle a single HTTP request with better error handling."""
        try:
            super().handle_one_request()
        except (ConnectionAbortedError, ConnectionResetError, BrokenPipeError):
            # These are normal when browsers close connections early
            pass
        except Exception as e:
            print(f"⚠️  Request handling error: {e}")

def start_server():
    """Start the HTTP server and open the browser."""
    try:
        with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
            print(f"🚀 Mock Exam Server starting...")
            print(f"📁 Serving directory: {DIRECTORY}")
            print(f"🌐 Server running at: http://localhost:{PORT}")
            print(f"🎯 Opening browser automatically...")
            print(f"⚡ Press Ctrl+C to stop the server")
            print("-" * 50)
            
            # Open the browser automatically
            webbrowser.open(f"http://localhost:{PORT}")
            
            # Start serving
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
    except OSError as e:
        if e.errno == 10048:  # Port already in use
            print(f"❌ Port {PORT} is already in use. Try a different port or stop the existing server.")
        else:
            print(f"❌ Error starting server: {e}")

if __name__ == "__main__":
    start_server()
