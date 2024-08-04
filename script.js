const quizData = [
    {
        question: "What percentage of the Earth's surface is covered by oceans?",
        choices: ["50%", "71%", "85%"],
        answer: "71%"
    },
    {
        question: "How much of the world's oxygen is produced by the oceans?",
        choices: ["25%", "50%", "70%"],
        answer: "50%"
    },
    {
        question: "How many people depend on marine and coastal biodiversity for their livelihoods?",
        choices: ["1 billion", "2 billion", "3 billion"],
        answer: "3 billion"
    },
    {
        question: "Which of the following is a major threat to marine life?",
        choices: ["Overfishing", "Deforestation", "Desertification"],
        answer: "Overfishing"
    },
    {
        question: "What is the primary cause of coral bleaching?",
        choices: ["Rising sea levels", "Increased water temperature", "Oil spills"],
        answer: "Increased water temperature"
    },
    {
        question: "What percentage of the world's fisheries are fully exploited or overexploited?",
        choices: ["33%", "50%", "90%"],
        answer: "33%"
    },
    {
        question: "Which international agreement aims to protect marine biodiversity beyond national jurisdictions?",
        choices: ["Paris Agreement", "Nagoya Protocol", "United Nations Convention on the Law of the Sea (UNCLOS)"],
        answer: "United Nations Convention on the Law of the Sea (UNCLOS)"
    },
    {
        question: "What is the target year for the SDG 14 goal to effectively regulate harvesting and end overfishing?",
        choices: ["2020", "2025", "2030"],
        answer: "2020"
    },
    {
        question: "Which of the following is a benefit of Marine Protected Areas (MPAs)?",
        choices: ["Increased coastal development", "Enhanced marine biodiversity", "Higher carbon emissions"],
        answer: "Enhanced marine biodiversity"
    },
    {
        question: "What is the main purpose of the SDG 14 target to prevent and significantly reduce marine pollution?",
        choices: ["Increase tourism", "Protect human health and marine ecosystems", "Boost fishing industry profits"],
        answer: "Protect human health and marine ecosystems"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const startQuizButton = document.getElementById('start-quiz');
const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const choicesContainer = document.getElementById('choices-container');
const nextQuestionButton = document.getElementById('next-question');
const scoreContainer = document.getElementById('score-container');

startQuizButton.addEventListener('click', startQuiz);
nextQuestionButton.addEventListener('click', showNextQuestion);

function startQuiz() {
    startQuizButton.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    startQuizButton.textContent = "Restart Quiz"; //
    startQuizButton.classList.remove('hidden');
    startQuizButton.removeEventListener('click', startQuiz);
    startQuizButton.addEventListener('click', restartQuiz);
    resetState();
    const currentQuestion = quizData[currentQuestionIndex];
    questionContainer.textContent = currentQuestion.question;
    currentQuestion.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.classList.add('choice');
        button.addEventListener('click', () => selectAnswer(choice, currentQuestion.answer));
        choicesContainer.appendChild(button);
    });
}

function resetState() {
    nextQuestionButton.classList.add('hidden');
    while (choicesContainer.firstChild) {
        choicesContainer.removeChild(choicesContainer.firstChild);
    }
}

function selectAnswer(choice, correctAnswer) {
    if (choice === correctAnswer) {
        score++;
    }
    Array.from(choicesContainer.children).forEach(button => {
        button.disabled = true;
        if (button.textContent === correctAnswer) {
            button.classList.add('correct');
        } else {
            button.classList.add('incorrect');
        }
    });
    nextQuestionButton.classList.remove('hidden');
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    questionContainer.classList.add('hidden');
    nextQuestionButton.classList.add('hidden');
    scoreContainer.classList.remove('hidden');
    scoreContainer.textContent = `Your score is ${score} out of ${quizData.length}`;
    startQuizButton.textContent = "Restart Quiz";
    startQuizButton.classList.remove('hidden');
    startQuizButton.removeEventListener('click', startQuiz);
    startQuizButton.addEventListener('click', restartQuiz);
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.classList.add('hidden');
    questionContainer.classList.remove('hidden');
    startQuizButton.classList.add('hidden');
    startQuizButton.textContent = "Start Quiz";
    showQuestion();
}

// Facts carousel functionality
const factsCarousel = document.getElementById('facts-carousel');
const facts = Array.from(factsCarousel.getElementsByClassName('fact'));
let currentFactIndex = 0;

// Hide all facts except the first one
facts.forEach((fact, index) => {
    if (index !== 0) {
        fact.classList.add('hidden');
    }
});

function showNextFact() {
    facts[currentFactIndex].classList.add('hidden');
    currentFactIndex = (currentFactIndex + 1) % facts.length;
    facts[currentFactIndex].classList.remove('hidden');
}

setInterval(showNextFact, 5000); // Change fact every 5 seconds
