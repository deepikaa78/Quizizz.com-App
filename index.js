const question = [
    {
        question: "What is the keyword used to define a class in Java?",
        answers: [
            { text: "method", correct: false },
            { text: "class", correct: true },
            { text: "object", correct: false },
            { text: "function", correct: false },
        ]
    },
    {
        question: "What is the default value of an int variable in Java?",
        answers: [
            { text: "0", correct: true },
            { text: "1", correct: false },
            { text: "null", correct: false },
            { text: "-1", correct: false },
        ]
    },
    {
        question: "Which method is used to start the execution of a Java program?",
        answers: [
            { text: "main", correct: true },
            { text: "start", correct: false },
            { text: "begin", correct: false },
            { text: "run", correct: false },
        ]
    },
    {
        question: "What keyword is used to inherit a class in Java?",
        answers: [
            { text: "inherits", correct: false },
            { text: "extends", correct: true },
            { text: "implements", correct: false },
            { text: "uses", correct: false },
        ]
    },
    {
        question: "Which data type is used to store a single character in Java?",
        answers: [
            { text: "String", correct: false },
            { text: "char", correct: true },
            { text: "string", correct: false },
            { text: "text", correct: false },
        ]
    },
    {
        question: "What is the name of the Java virtual machine specification?",
        answers: [
            { text: "JDK", correct: false },
            { text: "JVM", correct: true },
            { text: "JRE", correct: false },
            { text: "JDE", correct: false },
        ]
    },
    {
        question: "What keyword is used to create a constant in Java?",
        answers: [
            { text: "const", correct: false },
            { text: "final", correct: true },
            { text: "static", correct: false },
            { text: "constant", correct: false },
        ]
    },
    {
        question: "Which package is imported by default in every Java program?",
        answers: [
            { text: "java.lang", correct: true },
            { text: "java.util", correct: false },
            { text: "java.io", correct: false },
            { text: "java.awt", correct: false },
        ]
    },
    {
        question: "What is the result of 10 / 3 in Java?",
        answers: [
            { text: "3", correct: true },
            { text: "3.0", correct: false },
            { text: "3.33", correct: false },
            { text: "3.5", correct: false },
        ]
    },
    {
        question: "Which of the following is a valid declaration of a float variable?",
        answers: [
            { text: "float f = 1.0;", correct: false },
            { text: "float f = 1.0f;", correct: false},
            { text: "float f = (float) 1.0;", correct: false },
            { text: "Both b and c", correct: true },
        ]
    }
];

const startPage = document.getElementById("start-page");
const quizApp = document.getElementById("quiz-app");
const startQuizBtn = document.getElementById("start-quiz-btn");
const questionsElement = document.getElementById("question");
const answersButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const homeButton = document.getElementById("home-btn");

let currentQuestionIndex = 0;
let score = 0;

startQuizBtn.addEventListener("click", () => {
    startPage.style.display = "none";
    quizApp.style.display = "block";
    startQuiz();
});

homeButton.addEventListener("click", () => {
    quizApp.style.display = "none";
    startPage.style.display = "block";
});

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    nextButton.style.display = "none";
    homeButton.style.display = "none"; // Hide home button initially
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = question[currentQuestionIndex];
    // Display the question number along with the question text
    questionsElement.innerHTML = ` ${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) button.dataset.correct = true;
        button.addEventListener("click", selectAnswer);
        answersButton.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    answersButton.innerHTML = "";
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answersButton.children).forEach(button => {
        if (button.dataset.correct) button.classList.add("correct");
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionsElement.innerHTML = `You scored ${score} out of ${question.length}!`;
    nextButton.innerHTML = "Try Again";
    nextButton.style.display = "block";
    homeButton.style.display = "block"; // Show home button
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < question.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < question.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});



