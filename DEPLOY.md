# 🚀 GitHub Pages Deployment Guide

## Quick Deploy to GitHub Pages

### Step 1: Create Repository
1. Go to [GitHub](https://github.com) and create a new repository
2. Name it something like `matrix-mock-exams` or `mock-exam-website`
3. Make sure it's **public** (required for free GitHub Pages)
4. Don't initialize with README (we have our own files)

### Step 2: Upload Files
You have two options:

#### Option A: Web Upload (Easiest)
1. Click "uploading an existing file" on the empty repository page
2. Drag and drop ALL files from this `website` folder:
   - `index.html`
   - `style.css`
   - `script.js`
   - `exam-data.js`
   - `README.md`
   - `.gitignore`
3. Commit the files

#### Option B: Git Command Line
```bash
git init
git add .
git commit -m "Initial commit - Matrix Mock Exam Website"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo-name.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select "Deploy from a branch"
5. Select **main** branch
6. Select **/ (root)** folder
7. Click **Save**

### Step 4: Access Your Site
- Your site will be available at: `https://yourusername.github.io/repository-name`
- It may take a few minutes to deploy
- You'll see a green checkmark when it's ready

## 🔧 Configuration Files

### Files Required for GitHub Pages:
- ✅ `index.html` - Main page
- ✅ `style.css` - Styling
- ✅ `script.js` - Quiz functionality
- ✅ `exam-data.js` - Embedded exam data
- ✅ `README.md` - Documentation

### Files NOT Needed for GitHub Pages:
- ❌ `server.py` - Local server (excluded via .gitignore)
- ❌ `start_server.ps1` - Server script (excluded via .gitignore)
- ❌ `generate_exam_data.py` - Build script (excluded via .gitignore)
- ❌ `exams/` folder - Original markdown files (optional)

## 🎯 Testing Your Deployment

1. **Local Test**: Open `index.html` directly in your browser
2. **GitHub Pages Test**: Visit your GitHub Pages URL
3. **Functionality Test**: 
   - Select an exam from the dropdown
   - Click "Load Selected Exam"
   - Answer some questions
   - Check that feedback works

## 🛠️ Troubleshooting

### Common Issues:

**Site not loading?**
- Check that repository is public
- Verify GitHub Pages is enabled in Settings
- Wait 5-10 minutes for deployment

**Exams not loading?**
- Check browser console for errors (F12)
- Verify `exam-data.js` was uploaded
- Confirm `index.html` includes both script files

**Styling looks broken?**
- Verify `style.css` was uploaded
- Check browser console for 404 errors
- Clear browser cache and refresh

## 📝 Customization

### Adding New Exams:
1. Edit `exam-data.js` directly on GitHub
2. Add your exam to the `EMBEDDED_EXAMS` object
3. Update the dropdown options in `index.html`
4. Commit changes

### Changing Colors:
1. Edit `style.css` on GitHub
2. Modify CSS variables like `--matrix-green`
3. Commit changes

## 🌟 Success!

Once deployed, your Matrix Mock Exam website will:
- ✅ Work on any device
- ✅ Load instantly (no server needed)
- ✅ Be available 24/7
- ✅ Handle unlimited users
- ✅ Cost nothing to host

**Example URL**: `https://yourusername.github.io/matrix-mock-exams`

---

**Need help?** Check the main README.md for more details!
