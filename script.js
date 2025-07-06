const initialView = document.getElementById('initialView');
const examFile = document.getElementById('examFile');
const examArea = document.getElementById('examArea');
const questionContainer = document.getElementById('questionContainer');
const answerContainer = document.getElementById('answerContainer');
const checkBtn = document.getElementById('checkBtn');
const nextBtn = document.getElementById('nextBtn');
const resultsArea = document.getElementById('resultsArea');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restartBtn');
const progressBar = document.getElementById('progressBar');

// New elements for dropdown functionality
const generatedExamSelect = document.getElementById('generatedExamSelect');
const loadGeneratedExamBtn = document.getElementById('loadGeneratedExam');

// New elements for template copy and customization
const copyTemplateBtn = document.getElementById('copyTemplateBtn');
const customizeBtn = document.getElementById('customizeBtn');
const customizeModal = document.getElementById('customizeModal');
const closeModal = document.getElementById('closeModal');
const accentColor = document.getElementById('accentColor');
const backgroundHue = document.getElementById('backgroundHue');
const accentPreview = document.getElementById('accentPreview');
const backgroundPreview = document.getElementById('backgroundPreview');
const resetColors = document.getElementById('resetColors');
const applyColors = document.getElementById('applyColors');
const presetBtns = document.querySelectorAll('.preset-btn');

// Template text for clipboard
const TEMPLATE_TEXT = `### Prompt for Generating Compatible Mock Exams

Please generate a mock exam on the topic of **[Your Topic Here]**. The exam must be structured in a specific Markdown format to be compatible with my parsing script.

The entire output must be a single block of Markdown text. Please ensure the final output can be saved as a .md file.

**Formatting Rules:**

1. **Main Title:** The exam must begin with a level 1 heading for the title, like # [Your Topic Here] Mock Exam.

2. **Question Sections:**
   * The exam should have exactly 3 sections: Section A, Section B, and Section C.
   * Each section header must be a level 2 heading with point values, like ## Section A: Multiple Choice (20 Marks).
   * Each section must contain exactly 5 questions.
   * **ALL questions must be multiple choice with exactly 4 options (a, b, c, d).**
   * Each question must be numbered (e.g., 1., 2., 3., 4., 5.).
   * Multiple-choice options must be on new lines, starting with a letter and parenthesis followed by a space (e.g., a) Option text, b) Option text).

3. **Answer Separator:**
   * After all the questions and before the answers, there **must** be a --- horizontal rule on its own line.

4. **Answers and Explanations:**
   * After the separator, there must be a level 1 heading for the answers: # Answers.
   * The answers should be organized in sections matching the question sections (e.g., ## Section A, ## Section B, ## Section C).
   * Each answer **must** be on a single line and follow this exact format:
     [Question Number]. [Correct Option Letter]) [Answer Text] || **Explanation:** [Detailed explanation of why this answer is correct]

**Crucial Formatting Details:**

* The || separator between the answer and the explanation is essential for the script to work.
* The explanation must begin with **Explanation:** (including the bold markdown).
* Each answer must start with the question number, followed by the correct option letter and closing parenthesis.
* Ensure each section has exactly 5 questions and 5 corresponding answers.

---

### Example of the Required Format:

# Biology Mock Exam

## Section A: Multiple Choice (20 Marks)

1. Which of the following is the basic unit of life?
   a) Atom
   b) Cell
   c) Tissue
   d) Organ

2. What is the process by which plants make their own food?
   a) Respiration
   b) Photosynthesis
   c) Digestion
   d) Absorption

## Section B: Multiple Choice (30 Marks)

1. Which organelle is responsible for energy production in the cell?
   a) Nucleus
   b) Ribosome
   c) Mitochondria
   d) Golgi apparatus

## Section C: Multiple Choice (50 Marks)

1. What is the scientific name for humans?
   a) Homo sapiens
   b) Homo erectus
   c) Homo habilis
   d) Homo neanderthalensis

---

# Answers

## Section A

1. b) Cell || **Explanation:** The cell is the basic structural and functional unit of all living organisms. All life forms, from single-celled bacteria to complex multicellular organisms, are composed of cells.
2. b) Photosynthesis || **Explanation:** Photosynthesis is the process by which plants convert light energy, usually from the sun, into chemical energy stored in glucose. This process uses carbon dioxide and water as raw materials.

## Section B

1. c) Mitochondria || **Explanation:** Mitochondria are known as the "powerhouses" of the cell because they produce ATP (adenosine triphosphate), which is the primary energy currency of the cell through cellular respiration.

## Section C

1. a) Homo sapiens || **Explanation:** Homo sapiens is the scientific name for modern humans. The binomial nomenclature system uses genus (Homo) and species (sapiens) to classify organisms.

**Important Notes:**
- Make sure all questions are genuinely multiple choice with 4 options each
- Ensure explanations are detailed and educational
- Keep the exact formatting structure shown above
- Each section should have exactly 5 questions
- Total of 15 questions per exam`;

// Event listeners for existing functionality
let questions = [];
let answers = [];
let currentQuestionIndex = 0;
let score = 0;

// Event listener for file upload
examFile.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
        const content = e.target.result;
        [questions, answers] = parseMarkdown(content);
        if (questions.length > 0) {
            initialView.classList.add('hidden');
            examArea.classList.remove('hidden');
            startExam();
        }
    };

    reader.readAsText(file);
});

// Event listener for generated exam selection
loadGeneratedExamBtn.addEventListener('click', async () => {
    const selectedExam = generatedExamSelect.value;
    if (!selectedExam) {
        alert('Please select an exam from the dropdown.');
        return;
    }
    
    try {
        // Show loading indicator
        loadGeneratedExamBtn.textContent = 'Loading...';
        loadGeneratedExamBtn.disabled = true;
        
        // Use embedded exam data for GitHub Pages compatibility
        const content = getExamContent(selectedExam);
        
        if (!content) {
            throw new Error('Exam content not found');
        }
        
        [questions, answers] = parseMarkdown(content);
        
        if (questions.length > 0) {
            initialView.classList.add('hidden');
            examArea.classList.remove('hidden');
            startExam();
        } else {
            alert('Failed to parse the exam file. Please check the format.');
        }
        
    } catch (error) {
        console.error('Error loading exam:', error);
        alert('Error loading exam: ' + error.message);
    } finally {
        // Restore button state
        loadGeneratedExamBtn.textContent = 'Load Selected Exam';
        loadGeneratedExamBtn.disabled = false;
    }
});

function startExam() {
    currentQuestionIndex = 0;
    score = 0;
    displayCurrentQuestion();
}

function parseMarkdown(content) {
    const sections = content.split('---');
    if (sections.length < 2) return [[], []];

    const questionsText = sections[0];
    const answersText = sections[1];

    const questions = [];
    let currentQuestion = null;

    const questionLines = questionsText.split('\n');

    for (const line of questionLines) {
        const trimmedLine = line.trim();
        if (trimmedLine.match(/^\d+\.\s/)) { // It's a new question
            if (currentQuestion) {
                questions.push(currentQuestion);
            }
            currentQuestion = {
                text: trimmedLine,
                options: []
            };
        } else if (trimmedLine.match(/^[a-d]\)\s/)) { // It's an option
            if (currentQuestion) {
                currentQuestion.options.push(trimmedLine);
            }
        } else if (trimmedLine.match(/^##\s/)) { // It's a section header
            // Skip section headers
        } else if (trimmedLine.match(/^#\s/)) { // It's the title
            // Skip title
        } else if (trimmedLine.length > 0) { // It's part of the question text
            if (currentQuestion) {
                currentQuestion.text += ' ' + trimmedLine;
            }
        }
    }

    if (currentQuestion) {
        questions.push(currentQuestion);
    }

    // Parse answers
    const answers = [];
    const answerLines = answersText.split('\n');
    
    for (const line of answerLines) {
        const trimmedLine = line.trim();
        if (trimmedLine.match(/^\d+\.\s/)) { // It's an answer
            const parts = trimmedLine.split('||');
            if (parts.length >= 2) {
                const answerPart = parts[0].trim();
                const explanationPart = parts[1].trim();
                
                // Extract the correct option (a, b, c, or d)
                const optionMatch = answerPart.match(/^\d+\.\s+([a-d])\)/);
                if (optionMatch) {
                    const correctOption = optionMatch[1];
                    answers.push({
                        correct: correctOption,
                        explanation: explanationPart
                    });
                }
            }
        }
    }

    return [questions, answers];
}

function displayCurrentQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResults();
        return;
    }

    const question = questions[currentQuestionIndex];
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = progressPercentage + '%';

    questionContainer.innerHTML = `
        <div class="question">
            <strong>Question ${currentQuestionIndex + 1}:</strong> ${question.text}
            <div class="options">
                ${question.options.map(option => `
                    <label>
                        <input type="radio" name="answer" value="${option.charAt(0)}">
                        <span>${option}</span>
                    </label>
                `).join('')}
            </div>
        </div>
    `;

    answerContainer.innerHTML = '';
    answerContainer.classList.remove('correct', 'incorrect');
    checkBtn.classList.remove('hidden');
    nextBtn.classList.add('hidden');
}

checkBtn.addEventListener('click', () => {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (!selectedAnswer) {
        alert('Please select an answer.');
        return;
    }

    const userAnswer = selectedAnswer.value;
    const correctAnswer = answers[currentQuestionIndex].correct;
    const explanation = answers[currentQuestionIndex].explanation;

    if (userAnswer === correctAnswer) {
        score++;
        answerContainer.innerHTML = `
            <p><strong>Correct!</strong></p>
            <p>${explanation}</p>
        `;
        answerContainer.classList.add('correct');
    } else {
        answerContainer.innerHTML = `
            <p><strong>Incorrect.</strong></p>
            <p>The correct answer is: ${correctAnswer})</p>
            <p>${explanation}</p>
        `;
        answerContainer.classList.add('incorrect');
    }

    checkBtn.classList.add('hidden');
    nextBtn.classList.remove('hidden');
});

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    displayCurrentQuestion();
});

function showResults() {
    examArea.classList.add('hidden');
    resultsArea.classList.remove('hidden');
    const percentage = Math.round((score / questions.length) * 100);
    scoreEl.textContent = `${score}/${questions.length} (${percentage}%)`;
}

restartBtn.addEventListener('click', () => {
    resultsArea.classList.add('hidden');
    initialView.classList.remove('hidden');
    questions = [];
    answers = [];
    currentQuestionIndex = 0;
    score = 0;
    progressBar.style.width = '0%';
    examFile.value = '';
    generatedExamSelect.value = '';
});

// === NEW FUNCTIONALITY ===

// Clipboard Copy Functionality
copyTemplateBtn.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(TEMPLATE_TEXT);
        
        // Visual feedback
        const originalText = copyTemplateBtn.textContent;
        copyTemplateBtn.textContent = '✅ Copied!';
        copyTemplateBtn.style.background = 'linear-gradient(45deg, #004400, #008800)';
        
        setTimeout(() => {
            copyTemplateBtn.textContent = originalText;
            copyTemplateBtn.style.background = 'linear-gradient(45deg, #004400, #006600)';
        }, 2000);
        
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = TEMPLATE_TEXT;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            copyTemplateBtn.textContent = '✅ Copied!';
            setTimeout(() => {
                copyTemplateBtn.textContent = '📋 Copy Template to Clipboard';
            }, 2000);
        } catch (err) {
            alert('Could not copy to clipboard. Please manually copy the template text.');
        }
        
        document.body.removeChild(textArea);
    }
});

// Customization Modal Functionality
customizeBtn.addEventListener('click', () => {
    customizeModal.classList.remove('hidden');
    updateColorPreviews();
});

closeModal.addEventListener('click', () => {
    customizeModal.classList.add('hidden');
});

// Close modal when clicking outside
customizeModal.addEventListener('click', (e) => {
    if (e.target === customizeModal) {
        customizeModal.classList.add('hidden');
    }
});

// Color customization functions
function updateColorPreviews() {
    const accentValue = accentColor.value;
    const hueValue = backgroundHue.value;
    
    accentPreview.style.backgroundColor = accentValue;
    backgroundPreview.style.backgroundColor = `hsl(${hueValue}, 50%, 15%)`;
}

accentColor.addEventListener('input', updateColorPreviews);
backgroundHue.addEventListener('input', updateColorPreviews);

// Preset color buttons
presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const color = btn.dataset.color;
        const hue = btn.dataset.hue;
        
        accentColor.value = color;
        backgroundHue.value = hue;
        updateColorPreviews();
    });
});

// Apply color changes
applyColors.addEventListener('click', () => {
    const newAccentColor = accentColor.value;
    const newBackgroundHue = backgroundHue.value;
    
    // Update CSS custom properties
    document.documentElement.style.setProperty('--matrix-green', newAccentColor);
    document.documentElement.style.setProperty('--background-hue', newBackgroundHue);
    
    // Save to localStorage
    localStorage.setItem('matrixAccentColor', newAccentColor);
    localStorage.setItem('matrixBackgroundHue', newBackgroundHue);
    
    // Close modal
    customizeModal.classList.add('hidden');
    
    // Show success message
    showNotification('🎨 Colors updated successfully!');
});

// Reset to default colors
resetColors.addEventListener('click', () => {
    document.documentElement.style.setProperty('--matrix-green', '#00ff00');
    document.documentElement.style.setProperty('--background-hue', '120');
    
    accentColor.value = '#00ff00';
    backgroundHue.value = '120';
    updateColorPreviews();
    
    // Clear localStorage
    localStorage.removeItem('matrixAccentColor');
    localStorage.removeItem('matrixBackgroundHue');
    
    showNotification('🔄 Colors reset to default!');
});

// Load saved colors on page load
function loadSavedColors() {
    const savedAccentColor = localStorage.getItem('matrixAccentColor');
    const savedBackgroundHue = localStorage.getItem('matrixBackgroundHue');
    
    if (savedAccentColor) {
        document.documentElement.style.setProperty('--matrix-green', savedAccentColor);
        accentColor.value = savedAccentColor;
    }
    
    if (savedBackgroundHue) {
        document.documentElement.style.setProperty('--background-hue', savedBackgroundHue);
        backgroundHue.value = savedBackgroundHue;
    }
    
    updateColorPreviews();
}

// Show notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #004400, #006600);
        color: #00ff00;
        padding: 15px 20px;
        border-radius: 8px;
        border: 2px solid #00ff00;
        z-index: 3000;
        font-weight: bold;
        box-shadow: 0 4px 15px rgba(0, 255, 0, 0.3);
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize colors when page loads
document.addEventListener('DOMContentLoaded', loadSavedColors);
