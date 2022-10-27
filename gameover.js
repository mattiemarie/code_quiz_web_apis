const username = document.querySelector('#username')
const saveScoreButton = document.querySelector('#saveScoreButton')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')
const highScores = JSON.parse(localStorage.getItem('highScores')) || []
const MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore

//High Scores
saveHighScore = e => {
    e.preventDefault()

    //Score results will be shown and User will input name
    const score = {
        score: mostRecentScore,
        name: username.value  
    }
    highScores.push(score)
    highScores.sort((a,b) => {
        return b.score - a.score
    })

    //Top 6 High Scores will be Shown on Highscores Page
    highScores.splice(6)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('index.html')
};