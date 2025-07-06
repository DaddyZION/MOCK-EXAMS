# Mock Exam Taker

A Matrix-themed mock exam website that allows you to take interactive exams with instant feedback.

## 🚀 Quick Start

### Method 1: Using the HTTP Server (Recommended)
1. **Double-click `start_server.bat`** - This will:
   - Start a local HTTP server
   - Open your browser automatically
   - Enable seamless exam loading from the dropdown

2. **Select an exam** from the dropdown and click "Load Selected Exam"

3. **Take the exam** - Answer questions and get instant feedback

### Method 2: Direct HTML File (Limited functionality)
1. **Double-click `index.html`** to open directly in your browser
2. **Note**: The dropdown will require manual file selection due to browser security restrictions

## 📁 File Structure

```
website/
├── index.html          # Main exam interface
├── style.css           # Matrix-themed styling
├── script.js           # Exam logic and functionality
├── server.py           # HTTP server for local development
├── start_server.bat    # Windows batch file to start server
├── README.md           # This file
└── exams/              # Generated exam files
    ├── chemistry_exam.md
    ├── physics_exam.md
    ├── history_exam.md
    └── ... (more exams)
```

## ✨ Features

- **Matrix-themed UI** with green glowing text and animated background
- **Dropdown selection** of pre-generated exams
- **File upload** for custom exam files
- **Question-by-question** progression with instant feedback
- **Score tracking** and final results
- **Responsive design** that works on different screen sizes

## 📝 Exam Format

Exams should be in Markdown format with this structure:

```markdown
1. Question text here?
A) Option A
B) Option B
C) Option C
D) Option D

2. Second question here?
A) Option A
B) Option B
C) Option C
D) Option D

---

1. A
Explanation for question 1

2. B
Explanation for question 2
```

## 🔧 Technical Details

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Server**: Python 3 HTTP server
- **Styling**: Matrix-inspired theme with CSS animations
- **File handling**: Supports local file upload and HTTP fetch

## 🛠️ Troubleshooting

**Problem**: Dropdown doesn't load exams automatically
**Solution**: Use `start_server.bat` instead of opening HTML directly

**Problem**: Server won't start
**Solution**: Make sure Python is installed and port 8000 is available

**Problem**: Exam file format errors
**Solution**: Check that your .md file follows the required format (questions above `---`, answers below)

## 🎯 Usage Tips

1. **Use the server** for the best experience
2. **Check exam format** if you're creating custom exams
3. **Read explanations** after each question to learn
4. **Try different subjects** to test various knowledge areas

Enjoy your mock exams! 🎓
