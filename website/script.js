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

let questions = [];
let answers = [];
let currentQuestionIndex = 0;
let score = 0;

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
            currentQuestion = { text: trimmedLine.replace(/^\d+\.\s/, ''), options: [] };
        } else if (currentQuestion && trimmedLine.match(/^[a-d]\)/)) { // It's an option for the current question
            currentQuestion.options.push(trimmedLine);
        }
    }
    if (currentQuestion) { // Add the last question
        questions.push(currentQuestion);
    }

    const answers = [];
    const answerLines = answersText.split('\n');
    
    for (const line of answerLines) {
        const trimmedLine = line.trim();
        if (trimmedLine.match(/^\d+\.\s/)) {
            // Check if it has explanation format
            if (trimmedLine.includes('|| **Explanation:**')) {
                answers.push(trimmedLine.replace(/^\d+\.\s/, '').trim());
            } else {
                // If no explanation, add a default one
                const answerText = trimmedLine.replace(/^\d+\.\s/, '').trim();
                answers.push(answerText + ' || **Explanation:** No explanation provided.');
            }
        }
    }

    return [questions, answers];
}

function displayCurrentQuestion() {
    answerContainer.innerHTML = '';
    answerContainer.className = '';
    const question = questions[currentQuestionIndex];
    questionContainer.innerHTML = '';

    const questionEl = document.createElement('div');
    questionEl.classList.add('question');
    questionEl.innerHTML = `<p><strong>Question ${currentQuestionIndex + 1}:</strong> ${question.text}</p>`;

    const optionsEl = document.createElement('div');
    optionsEl.classList.add('options');

    if (question.options.length > 0) {
        question.options.forEach(option => {
            const optionValue = option.charAt(0);
            optionsEl.innerHTML += `
                <label>
                    <input type="radio" name="question${currentQuestionIndex}" value="${optionValue}">
                    <span>${option}</span>
                </label>
            `;
        });
        questionEl.appendChild(optionsEl);
    } else {
        questionEl.innerHTML += `<textarea id="question${currentQuestionIndex}" placeholder="Your answer..."></textarea>`;
    }

    questionContainer.appendChild(questionEl);
    updateProgressBar();
    checkBtn.classList.remove('hidden');
    nextBtn.classList.add('hidden');
}

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

checkBtn.addEventListener('click', () => {
    const question = questions[currentQuestionIndex];
    
    if (!answers[currentQuestionIndex]) {
        console.error('No answer found for current question');
        return;
    }
    
    const answerData = answers[currentQuestionIndex].split('|| **Explanation:**');
    const correctAnswerText = answerData[0].trim();
    const explanation = answerData[1] ? answerData[1].trim() : "No explanation provided.";

    let userAnswer = null;
    if (question.options.length > 0) {
        const selectedOption = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
        if (selectedOption) {
            userAnswer = selectedOption.value;
        }
    } else {
        const textarea = document.getElementById(`question${currentQuestionIndex}`);
        if (textarea) {
            userAnswer = textarea.value.trim();
        }
    }

    if (!userAnswer) {
        alert('Please select an answer first.');
        return;
    }

    let isCorrect = false;
    if (userAnswer) {
        const ua = userAnswer.toLowerCase();
        const ca = correctAnswerText.toLowerCase();
        if (question.options.length > 0) {
            // e.g., userAnswer is 'b', correctAnswerText is 'b) 11'
            if (ca.startsWith(ua + ')')) {
                isCorrect = true;
            }
        } else {
            // For free text, check if the user's answer is contained within the correct answer
            if (ca.includes(ua)) {
                isCorrect = true;
            }
        }
    }

    if (isCorrect) {
        score++;
        answerContainer.innerHTML = `<p><strong>Correct!</strong></p><p>${explanation}</p>`;
        answerContainer.classList.add('correct');
    } else {
        answerContainer.innerHTML = `<p><strong>Incorrect.</strong></p><p><b>The correct answer is:</b> ${correctAnswerText}</p><p>${explanation}</p>`;
        answerContainer.classList.add('incorrect');
    }

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

function showResults() {
    examArea.classList.add('hidden');
    resultsArea.classList.remove('hidden');
    scoreEl.textContent = `${score} / ${questions.length}`;
}

restartBtn.addEventListener('click', () => {
    resultsArea.classList.add('hidden');
    initialView.classList.remove('hidden');
    examFile.value = ''; // Reset file input
});
