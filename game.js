const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
var timerElement = document.querySelector('.timer-count');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []
var timer;
var timerCount;

// Question/Choice/Answer
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
        choice2: 'msgBox("Hello World")',
        choice3: 'alertBox="Hello World"',
        choice4: 'alertBox("Hello World")',
        answer: 1,
    },
]

const SCORE_POINTS = 20
const MAX_QUESTIONS = 5
const LOSE_TIME = 10

//Game Starts when Start game is selected
startGame = () => {
    questionCounter = 0
    //Timer Starts at 60 seconds
    timerCount = 60
    //Score Starts at 0
    score = 0
    availableQuestions = [...questions]
    startTimer()
    getNewQuestion()
}
  
//Timer counting down when 0 seconds is hit - GAMEOVER
startTimer = () => {
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount > 0) {
          } else {
            return window.location.assign('gameover.html')
        }
      }, 1000);    
}

//If game is lost user will be directed to GAMEOVER Page
loseGame = () => {
    return window.location.assign('gameover.html')
}

//Questions
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
       localStorage.setItem('mostRecentScore', score) 

       return window.location.assign('gameover.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random()*availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

//Choices
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset ['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        //If Choice is correct - points will be added to score
        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        //If Choice is incorrect - time 10 seconds will be deducted from score
        } else {
            timerCount -= 10;
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