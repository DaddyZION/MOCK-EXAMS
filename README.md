# Matrix Mock Exam Website

A Matrix-themed interactive mock exam website that works perfectly with GitHub Pages!

## 🚀 Features

- **Matrix-themed UI** with animated background and glowing effects
- **16 embedded mock exams** covering various subjects
- **Interactive quiz interface** with instant feedback
- **File upload** for custom markdown exams
- **📋 Template copy button** - Copy exam creation template to clipboard
- **🎨 Color customization** - Change the Matrix green to any color you want
- **GitHub Pages compatible** - no server required!
- **Responsive design** that works on all devices
- **💾 Settings persistence** - Your color choices are saved locally

## 📚 Available Exams

The website includes pre-built exams for:
- Anthropology, Art History, Astronomy, Chemistry
- Computer Science, Economics, Environmental Science
- Geography, History, Linguistics, Literature
- Music Theory, Philosophy, Physics, Psychology, Sociology

## 🌐 Deploy to GitHub Pages

### Option 1: Quick Deploy (Recommended)
1. Fork this repository
2. Go to repository Settings → Pages
3. Set Source to "Deploy from a branch"
4. Select `main` branch and `/ (root)` folder
5. Click Save - your site will be live at `https://yourusername.github.io/repository-name`

### Option 2: Manual Setup
1. Create a new GitHub repository
2. Upload all files from the `website` folder to the root of your repository
3. Enable GitHub Pages in repository settings
4. Your site will be available at `https://yourusername.github.io/repository-name`

## 💻 Local Development

### Run Locally (Simple)
Just open `index.html` in any modern web browser - it works directly!

### Run with Local Server (Optional)
For development purposes, you can still use the local server:
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

## 🎨 Customization

### Creating Your Own Exams
1. **Click the "📋 Copy Template to Clipboard" button** on the main page
2. **Paste the template** into ChatGPT, Claude, or your preferred AI assistant
3. **Replace `[Your Topic Here]`** with your desired subject (e.g., "Biology", "Math", "History")
4. **Generate the exam** and copy the result
5. **Upload the .md file** using the file upload section

### Color Themes
- **Click the 🎨 button** in the bottom-right corner
- **Choose from presets**: Matrix Green, Cyan, Magenta, Yellow, Orange, Red
- **Custom colors**: Use the color picker and hue slider for unlimited combinations
- **Settings are saved** automatically and persist between sessions

### Styling
Modify `style.css` to change the visual appearance.

Enjoy your mock exams! 🎓
