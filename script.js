const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const countElement = document.getElementById('count');

let shuffledQuestions, currentQuestionIndex;
let counter = 240;
let time;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    setNextQuestion();
    resetTimer();
}

function resetTimer() {
    counter = 240;
    countElement.innerHTML = counter;
    if (time) {
        clearInterval(time);
    }
    time = setInterval(() => {
        counter--;
        if (counter >= 0) {
            countElement.innerHTML = counter;
        } 
        if (counter === 0) {
            clearInterval(time);
            countElement.innerHTML = "GAME OVER";
            alert("Perdiste");
        }
    }, 1000);
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;

    setStatusClass(document.body, correct);
    
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}


const questions = [
    {
        question: 'Resuelve por Bisectriz f(x)=2x^2-6x-3',
        answers: [
            { text: '0.001953125', correct: true },
            { text: '0.001728146', correct: false },
        ]
    },
    {
        question: 'Resuelve por falsa posición f(x)=e^4x- 4',
        answers: [
            { text: '0.001953125', correct: false },
            { text: '0.001728146', correct: false },
            { text: '0.001942094', correct: true },
            { text: '0.002564525', correct: false },
        ]
    },
    {
        question: 'Resuelve por 3/8 de simpson ∫(sen2x + 3x^3)dx, donde n=5, a=0,b=1',
        answers: [
            { text: '0.101953125', correct: false },
            { text: '1.51683441', correct: true },
            { text: '0.003942094', correct: false },
            { text: '1.002564525', correct: false },
        ]
    },
    {
        question: 'Resuelve por Regla trapeizodal ∫ [cos(2x)+ x^2]dx, donde n=3, a=1,b=2',
        answers: [
            { text: '1.354245641', correct: true },
            { text: '1.36683441', correct: false },
        ]
    }

];
