const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const currentQuestionEl = document.getElementById('current-question');
const totalQuestionsEl = document.getElementById('total-questions');
const scoreEl = document.getElementById('score');
const progress = document.getElementById('progress');
const finalScoreEl = document.getElementById('final-score');
const maxScoreEl = document.getElementById('max-score');
const restartBtn = document.getElementById('restart-btn');

const questions = [
    {
        question: "Apa ibukota Indonesia?",
        answers: ["Jakarta", "Bandung", "Surabaya", "Bali"],
        correct: 0
    },
    {
        question: "Berapa hasil dari 5 + 5?",
        answers: ["5", "10", "15", "20"],
        correct: 1
    },
    {
        question: "Siapa penemu lampu bohlam?",
        answers: ["Albert Einstein", "Thomas Alva Edison", "Isaac Newton", "Nikola Tesla"],
        correct: 1
    },
    {
        question: "Apa nama planet terdekat dari Matahari?",
        answers: ["Venus", "Mars", "Merkurius", "Bumi"],
        correct: 2
    },
    {
        question: "Benua terbesar di dunia adalah?",
        answers: ["Afrika", "Eropa", "Asia", "Amerika"],
        correct: 2
    }
];

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    currentQuestionIndex = 0;
    score = 0;
    scoreEl.innerText = score;
    totalQuestionsEl.innerText = questions.length;
    maxScoreEl.innerText = questions.length;
    loadQuestion();
}

function loadQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;
    currentQuestionEl.innerText = currentQuestionIndex + 1;
    
    const progressPercent = (currentQuestionIndex / questions.length) * 100;
    progress.style.width = `${progressPercent}%`;

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('answers-btn');
        button.addEventListener('click', () => selectAnswer(index, button));
        answersContainer.appendChild(button);
    });
}

function resetState() {
    while (answersContainer.firstChild) {
        answersContainer.removeChild(answersContainer.firstChild);
    }
}

function selectAnswer(selectedIndex, button) {
    const currentQuestion = questions[currentQuestionIndex];
    
    // Disable all buttons
    Array.from(answersContainer.children).forEach(btn => {
        btn.disabled = true;
    });

    if (selectedIndex === currentQuestion.correct) {
        button.classList.add('correct');
        score++;
        scoreEl.innerText = score;
    } else {
        button.classList.add('incorrect');
        // Highlight correct answer
        answersContainer.children[currentQuestion.correct].classList.add('correct');
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 1000);
}

function showResult() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
    finalScoreEl.innerText = score;
    progress.style.width = `100%`;
}

startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', () => {
    resultScreen.classList.remove('active');
    startQuiz();
});
