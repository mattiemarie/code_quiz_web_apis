//Setting Question/Answer Variables
const question = document.querySelector('#question');
const answerChoices = Array.from(document.querySelectorAll('.choicetext'));
const scoreText = document.querySelector('#score');
const questionSpot = document.querySelector('#question-count')

//Setting Timer Variables
var timer;
var timerCount;

//Starting Value for Variables
let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []


// Question/Choice/Answer
let questions = [
    {   
        question: 'Which HTML element does Javascript go inside of?',
        choicetext1: '<javascript>',
        choicetext2: '<js>',
        choicetext3: '<script>',
        choicetext4: '<scripting>',
        answer: 3,
    },
    {
        question: 'How can you add a comment in JavaScript',
        choicetext1: '/*This is a comment*/',
        choicetext2: '<!--This is a comment-->',
        choicetext3: '#This is a comment',
        choicetext4: '//This is a comment',
        answer: 4,
    },
    {
        question: 'How do you round the number 7.25 to the nearest whole number?',
        choicetext1: 'Math.rnd(7.25)',
        choicetext2: 'Math.round(7.25)',
        choicetext3: 'rnd(7.25)',
        choicetext4: 'round(7.25)',
        answer: 2,
    },
    {
        question: 'In JavaScript, the symbols +, -, *, and / are?',
        choicetext1: 'expressions',
        choicetext2: 'operators',
        choicetext3: 'variables',
        choicetext4: 'comparison operators',
        answer: 2,
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        choicetext1: 'alert("Hello World")',
        choicetext2: 'msgBox("Hello World")',
        choicetext3: 'alertBox="Hello World"',
        choicetext4: 'alertBox("Hello World")',
        answer: 1,
    }
]

const POINTS_AWARDED = 20
const NUMBER_QUESTIONS = 5
const TIME_DECREASE = 10

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
 
//Timer                      Element Finished
var timerElement = document.querySelector('#timer-count');

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


//Questions
getNewQuestion = () => {

    questionCounter++
    questionSpot.innerText = `Question ${questionCounter} of ${NUMBER_QUESTIONS}`

    const questionsIndex = Math.floor(Math.random()*availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    answerChoices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choicetext' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers == true
}

//Choices
answerChoices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset ['number']

        let classToApply = selectedAnswer == currentQuestion.answerChoices ? 'correct' : 'incorrect'

        //If Choice is correct - points will be added to score
        if(classToApply === 'correct') {
            incrementScore(POINTS_AWARDED)

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