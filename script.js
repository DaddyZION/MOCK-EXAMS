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
const animationColor = document.getElementById('animationColor');
const accentPreview = document.getElementById('accentPreview');
const backgroundPreview = document.getElementById('backgroundPreview');
const animationPreview = document.getElementById('animationPreview');
const resetColors = document.getElementById('resetColors');
const applyColors = document.getElementById('applyColors');
const presetBtns = document.querySelectorAll('.preset-btn');

let questions = [];
let answers = [];
let currentQuestionIndex = 0;
let score = 0;

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

// === EVENT LISTENERS ===

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
                question: trimmedLine.replace(/^\d+\.\s/, ''),
                options: []
            };
        } else if (trimmedLine.match(/^[a-d]\)\s/)) { // It's an option
            if (currentQuestion) {
                currentQuestion.options.push(trimmedLine);
            }
        } else if (trimmedLine && currentQuestion && !currentQuestion.options.length) {
            // Continuation of question text
            currentQuestion.question += ' ' + trimmedLine;
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
        if (trimmedLine.match(/^\d+\.\s/)) {
            const parts = trimmedLine.split('||');
            if (parts.length >= 2) {
                const answerPart = parts[0].trim();
                const explanationPart = parts[1].trim();
                
                const answerMatch = answerPart.match(/^\d+\.\s*([a-d])\)\s*(.*)$/);
                if (answerMatch) {
                    answers.push({
                        option: answerMatch[1],
                        text: answerMatch[2],
                        explanation: explanationPart.replace(/^\*\*Explanation:\*\*\s*/, '')
                    });
                }
            }
        }
    }

    return [questions, answers];
}

function displayCurrentQuestion() {
    const question = questions[currentQuestionIndex];
    
    questionContainer.innerHTML = `
        <h2>Question ${currentQuestionIndex + 1} of ${questions.length}</h2>
        <p>${question.question}</p>
    `;

    answerContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'answer-option';
        optionElement.innerHTML = `
            <input type="radio" name="answer" value="${String.fromCharCode(97 + index)}" id="option${index}">
            <label for="option${index}">${option}</label>
        `;
        answerContainer.appendChild(optionElement);
    });

    checkBtn.classList.remove('hidden');
    nextBtn.classList.add('hidden');
    
    // Update progress bar
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

checkBtn.addEventListener('click', () => {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (!selectedAnswer) {
        alert('Please select an answer');
        return;
    }

    const userAnswer = selectedAnswer.value;
    const correctAnswer = answers[currentQuestionIndex];
    
    const isCorrect = userAnswer === correctAnswer.option;
    
    if (isCorrect) {
        score++;
    }

    // Show feedback
    showFeedback(isCorrect, correctAnswer);
    
    checkBtn.classList.add('hidden');
    nextBtn.classList.remove('hidden');
});

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        displayCurrentQuestion();
    } else {
        showResults();
    }
});

function showFeedback(isCorrect, correctAnswer) {
    const feedback = document.createElement('div');
    feedback.className = 'feedback';
    feedback.innerHTML = `
        <h3>${isCorrect ? 'Correct!' : 'Incorrect'}</h3>
        <p><strong>Correct Answer:</strong> ${correctAnswer.option}) ${correctAnswer.text}</p>
        <p><strong>Explanation:</strong> ${correctAnswer.explanation}</p>
    `;
    
    answerContainer.appendChild(feedback);
    
    // Disable all radio buttons
    document.querySelectorAll('input[name="answer"]').forEach(input => {
        input.disabled = true;
    });
    
    // Highlight correct answer
    const correctOptionInput = document.querySelector(`input[name="answer"][value="${correctAnswer.option}"]`);
    if (correctOptionInput) {
        correctOptionInput.parentElement.classList.add('correct');
    }
}

function showResults() {
    examArea.classList.add('hidden');
    resultsArea.classList.remove('hidden');
    
    const percentage = Math.round((score / questions.length) * 100);
    scoreEl.textContent = `${score}/${questions.length} (${percentage}%)`;
}

restartBtn.addEventListener('click', () => {
    // Reset everything
    resultsArea.classList.add('hidden');
    initialView.classList.remove('hidden');
    
    // Reset form
    generatedExamSelect.value = '';
    examFile.value = '';
    
    // Reset variables
    questions = [];
    answers = [];
    currentQuestionIndex = 0;
    score = 0;
});

// === CUSTOMIZATION FUNCTIONALITY ===

// Initialize customization functionality when DOM is ready
function initializeCustomization() {
    // Make sure modal starts hidden
    if (customizeModal) {
        customizeModal.classList.add('hidden');
    }
    
    // Clipboard Copy Functionality
    if (copyTemplateBtn) {
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
    }
    
    // Customization Modal Functionality
    if (customizeBtn) {
        customizeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (customizeModal) {
                customizeModal.classList.remove('hidden');
                updateColorPreviews();
            }
        });
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (customizeModal) {
                customizeModal.classList.add('hidden');
            }
        });
    }
    
    // Close modal when clicking outside
    if (customizeModal) {
        customizeModal.addEventListener('click', (e) => {
            if (e.target === customizeModal) {
                customizeModal.classList.add('hidden');
            }
        });
    }
    
    // Color customization functions
    function updateColorPreviews() {
        if (accentColor && accentPreview) {
            accentPreview.style.backgroundColor = accentColor.value;
        }
        if (backgroundHue && backgroundPreview) {
            backgroundPreview.style.backgroundColor = `hsl(${backgroundHue.value}, 50%, 15%)`;
        }
        if (animationColor && animationPreview) {
            animationPreview.style.backgroundColor = animationColor.value;
        }
    }
    
    if (accentColor) {
        accentColor.addEventListener('input', updateColorPreviews);
    }
    if (backgroundHue) {
        backgroundHue.addEventListener('input', updateColorPreviews);
    }
    if (animationColor) {
        animationColor.addEventListener('input', updateColorPreviews);
    }
    
    // Preset color buttons
    presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const accent = btn.dataset.accent;
            const hue = btn.dataset.hue;
            const animation = btn.dataset.animation;
            
            if (accent && accentColor) accentColor.value = accent;
            if (hue && backgroundHue) backgroundHue.value = hue;
            if (animation && animationColor) animationColor.value = animation;
            
            updateColorPreviews();
        });
    });
    
    // Apply color changes
    if (applyColors) {
        applyColors.addEventListener('click', () => {
            const newAccentColor = accentColor ? accentColor.value : '#00ff00';
            const newBackgroundHue = backgroundHue ? backgroundHue.value : '120';
            const newAnimationColor = animationColor ? animationColor.value : '#00ff00';
            
            // Update CSS custom properties
            document.documentElement.style.setProperty('--matrix-green', newAccentColor);
            document.documentElement.style.setProperty('--background-hue', newBackgroundHue);
            document.documentElement.style.setProperty('--animation-color', newAnimationColor);
            
            // Update the matrix rain animation
            updateMatrixAnimation(newAnimationColor);
            
            // Save to localStorage
            localStorage.setItem('matrixAccentColor', newAccentColor);
            localStorage.setItem('matrixBackgroundHue', newBackgroundHue);
            localStorage.setItem('matrixAnimationColor', newAnimationColor);
            
            // Close modal
            if (customizeModal) {
                customizeModal.classList.add('hidden');
            }
            
            // Show success message
            showNotification('🎨 Colors updated successfully!');
        });
    }
    
    // Reset to default colors
    if (resetColors) {
        resetColors.addEventListener('click', () => {
            document.documentElement.style.setProperty('--matrix-green', '#00ff00');
            document.documentElement.style.setProperty('--background-hue', '120');
            document.documentElement.style.setProperty('--animation-color', '#00ff00');
            
            if (accentColor) accentColor.value = '#00ff00';
            if (backgroundHue) backgroundHue.value = '120';
            if (animationColor) animationColor.value = '#00ff00';
            
            updateColorPreviews();
            updateMatrixAnimation('#00ff00');
            
            // Clear localStorage
            localStorage.removeItem('matrixAccentColor');
            localStorage.removeItem('matrixBackgroundHue');
            localStorage.removeItem('matrixAnimationColor');
            
            showNotification('🔄 Colors reset to default!');
        });
    }
    
    // Load saved colors
    loadSavedColors();
}

// Load saved colors on page load
function loadSavedColors() {
    const savedAccentColor = localStorage.getItem('matrixAccentColor');
    const savedBackgroundHue = localStorage.getItem('matrixBackgroundHue');
    const savedAnimationColor = localStorage.getItem('matrixAnimationColor');
    
    if (savedAccentColor) {
        document.documentElement.style.setProperty('--matrix-green', savedAccentColor);
        if (accentColor) accentColor.value = savedAccentColor;
    }
    
    if (savedBackgroundHue) {
        document.documentElement.style.setProperty('--background-hue', savedBackgroundHue);
        if (backgroundHue) backgroundHue.value = savedBackgroundHue;
    }
    
    if (savedAnimationColor) {
        document.documentElement.style.setProperty('--animation-color', savedAnimationColor);
        if (animationColor) animationColor.value = savedAnimationColor;
        updateMatrixAnimation(savedAnimationColor);
    }
}

// Update matrix rain animation color
function updateMatrixAnimation(color) {
    // Remove existing animation styles
    const existingStyle = document.getElementById('matrix-animation-style');
    if (existingStyle) {
        existingStyle.remove();
    }
    
    // Create new animation style with the selected color
    const style = document.createElement('style');
    style.id = 'matrix-animation-style';
    style.textContent = `
        body::before {
            background: linear-gradient(90deg, transparent, ${color}, transparent);
        }
        
        @keyframes matrix-rain {
            0% { 
                transform: translateY(-100vh) translateX(0);
                opacity: 0;
            }
            10% { 
                opacity: 1;
            }
            90% { 
                opacity: 1;
            }
            100% { 
                transform: translateY(100vh) translateX(50px);
                opacity: 0;
            }
        }
        
        body::after {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            background: 
                radial-gradient(circle at 20% 20%, ${color}22 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, ${color}22 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, ${color}11 0%, transparent 50%);
            animation: matrix-glow 4s ease-in-out infinite alternate;
        }
        
        @keyframes matrix-glow {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.7; }
        }
    `;
    document.head.appendChild(style);
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
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
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
document.head.appendChild(notificationStyle);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeCustomization);
