const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {   
        question: 'Which HTML element does Javascript go inside of?',
        choice1: '<javascript>',
        choice2: '<js>',
        choice3: '<script>',
        choice4: '<scripting>',
        answer: 3,
    },
    {
        question: 'How can you add a comment in JavaScript',
        choice1: '/*This is a comment*/',
        choice2: '<!--This is a comment-->',
        choice3: '#This is a comment',
        choice4: '//This is a comment',
        answer: 4,
    },
    {
        question: 'How do you round the number 7.25 to the nearest whole number?',
        choice1: 'Math.rnd(7.25)',
        choice2: 'Math.round(7.25)',
        choice3: 'rnd(7.25)',
        choice4: 'round(7.25)',
        answer: 2,
    },
    {
        question: 'In JavaScript, the symbols +, -, *, and / are?',
        choice1: 'expressions',
        choice2: 'operators',
        choice3: 'variables',
        choice4: 'comparison operators',
        answer: 2,
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        choice1: 'alert("Hello World")',
        choice2: 'msgBox("Hellow World")',
        choice3: 'alertBox="Hello World"',
        choice4: 'alertBox("Hello World")',
        answer: 1,
    },
]

const SCORE_POINTS = 20
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
       localStorage.setItem('mostRecentScore', score) 

       return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset ['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout (() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}


startGame()