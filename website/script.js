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
loadGeneratedExamBtn.addEventListener('click', () => {
    const selectedExam = generatedExamSelect.value;
    if (!selectedExam) {
        alert('Please select an exam from the dropdown.');
        return;
    }
    
    // Create a hidden file input to simulate file selection
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.md';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);
    
    // Set up event handler for when file is selected
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                [questions, answers] = parseMarkdown(content);
                if (questions.length > 0) {
                    initialView.classList.add('hidden');
                    examArea.classList.remove('hidden');
                    startExam();
                } else {
                    alert('Failed to parse the exam file. Please check the format.');
                }
                document.body.removeChild(fileInput);
            };
            reader.readAsText(file);
        }
    });
    
    // Show message and trigger file selection
    alert(`Please select the ${selectedExam} file from the exams folder when the file dialog opens.`);
    fileInput.click();
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
