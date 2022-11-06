//Setting Question/Answer Variables
const question = document.querySelector('#question');
const answerChoices = Array.from(document.querySelectorAll('.choiceoption'));
const scoreCount = document.querySelector('#score-count');
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

//Items that will not change throughout the game by will be applied to some changing element

//Points awarded for correct questions
const POINTS_AWARDED = 20
//Number of Question in the Quiz
const NUMBER_QUESTIONS = 5
//Number of Seconds a Players score will be decreased by if they answer a question incorrectly
const TIME_DECREASE = 10


// Questions
//Questions will have 4 answer choices the player can select from
let questions = [
    {   
        question: 'Which HTML element does Javascript go inside of?',
        choiceoption1: '<javascript>',
        choiceoption2: '<js>',
        choiceoption3: '<script>',
        choiceoption4: '<scripting>',
        answer: 3,
    },
    {
        question: 'How can you add a comment in JavaScript',
        choiceoption1: '/*This is a comment*/',
        choiceoption2: '<!--This is a comment-->',
        choiceoption3: '#This is a comment',
        choiceoption4: '//This is a comment',
        answer: 4,
    },
    {
        question: 'How do you round the number 7.25 to the nearest whole number?',
        choiceoption1: 'Math.rnd(7.25)',
        choiceoption2: 'Math.round(7.25)',
        choiceoption3: 'rnd(7.25)',
        choiceoption4: 'round(7.25)',
        answer: 2,
    },
    {
        question: 'In JavaScript, the symbols +, -, *, and / are?',
        choiceoption1: 'expressions',
        choiceoption2: 'operators',
        choiceoption3: 'variables',
        choiceoption4: 'comparison operators',
        answer: 2,
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        choiceoption1: 'alert("Hello World")',
        choiceoption2: 'msgBox("Hello World")',
        choiceoption3: 'alertBox="Hello World"',
        choiceoption4: 'alertBox("Hello World")',
        answer: 1,
    }
]


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

//Timer: Player will begin with 60 seconds
var timerElement = document.querySelector('#timer-count');

//When the Game begins, so will the timer
startTimer = () => {
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;

//If the Player times out, they will automatically be given a GAME OVER!
        if (timerCount > 0) {
          } else {
            return window.location.assign('gameover.html')
        }
      }, 1000);    
}

//Questions
getNewQuestion = () => {
    if(availableQuestions.length === 0) {
        localStorage.setItem('scoreCount', score)

    return window.location.assign('gameover.html')
    }

    //Questions will increase by 1 as the user goes through the quiz (formatting will be: question number [of] total number of quetions)
    questionCounter++
    questionSpot.innerText = `Question ${questionCounter} of ${NUMBER_QUESTIONS}`
 
    const questionsIndex = Math.floor(Math.random()*availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
   
    question.innerText = currentQuestion.question

//For Each question there is a corresponding correct answer. This is noted based on the dataset number set to each question.
    answerChoices.forEach(answerChoices => {
        const number = answerChoices.dataset['number']
        answerChoices.innerText = currentQuestion['choiceoption' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

//Is the Player's answer correct or incorrect
answerChoices.forEach(answerChoices => {
    answerChoices.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset ['number']

        //If the Player answers correctly then the color of the answer choice selected will turn GREEN
        //If the Player answers incorrectly then the color of the answer choice selected will turn RED
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        //If Choice is correct points will be added to Players score
        if(classToApply === 'correct') {
            incrementScore(POINTS_AWARDED)

        //If Choice is incorrect the timer will be decreased by 10 seconds
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

//If a Player gets a question correct, they will reciever POINT_AWARDED: 20 pts
incrementScore = num => {
    score +=num
    scoreCount.innerText = score
}


startGame()