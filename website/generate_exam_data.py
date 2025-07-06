#!/usr/bin/env python3
"""
Script to generate embedded exam data for GitHub Pages deployment
"""

import os
import json
from pathlib import Path

def read_exam_files():
    """Read all exam files and create embedded data structure"""
    exams_dir = Path("exams")
    embedded_exams = {}
    
    if not exams_dir.exists():
        print("Error: exams directory not found")
        return {}
    
    for exam_file in exams_dir.glob("*.md"):
        try:
            with open(exam_file, 'r', encoding='utf-8') as f:
                content = f.read()
                # Escape backticks and backslashes for JavaScript string
                content = content.replace('\\', '\\\\').replace('`', '\\`')
                embedded_exams[exam_file.name] = content
                print(f"✅ Added {exam_file.name}")
        except Exception as e:
            print(f"❌ Error reading {exam_file.name}: {e}")
    
    return embedded_exams

def generate_exam_data_js(embedded_exams):
    """Generate the exam-data.js file with embedded exam content"""
    
    js_content = """// Mock Exam Data - Embedded for GitHub Pages compatibility
// This file contains all exam data embedded as JavaScript objects
// Generated automatically - do not edit manually

const EMBEDDED_EXAMS = {
"""
    
    for exam_name, content in embedded_exams.items():
        js_content += f'    "{exam_name}": `{content}`,\n\n'
    
    js_content += """};

// Function to get list of available exams
function getAvailableExams() {
    return Object.keys(EMBEDDED_EXAMS);
}

// Function to get exam content
function getExamContent(examName) {
    return EMBEDDED_EXAMS[examName] || null;
}

// Function to get exam display names (remove .md extension and format)
function getExamDisplayName(examName) {
    return examName
        .replace('.md', '')
        .replace(/_/g, ' ')
        .replace(/\\b\\w/g, l => l.toUpperCase());
}
"""
    
    return js_content

def main():
    """Main function to generate embedded exam data"""
    print("🚀 Generating embedded exam data for GitHub Pages...")
    
    embedded_exams = read_exam_files()
    
    if not embedded_exams:
        print("❌ No exam files found!")
        return
    
    js_content = generate_exam_data_js(embedded_exams)
    
    # Write the exam-data.js file
    with open("exam-data.js", "w", encoding="utf-8") as f:
        f.write(js_content)
    
    print(f"✅ Generated exam-data.js with {len(embedded_exams)} exams")
    print("📁 Exams included:")
    for exam_name in embedded_exams.keys():
        print(f"   - {exam_name}")

if __name__ == "__main__":
    main()
