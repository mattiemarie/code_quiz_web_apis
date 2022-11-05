const playersName = document.querySelector('#username')
const saveScoreButton = document.querySelector('#saveScoreButton')
const finalGameScore = document.querySelector('#finalScore')
const lastPlayersScore = localStorage.getItem('lastPlayersScore')

const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || []
const MAX_LEADERBOARD_WINNERS = 5

finalGameScore.innerText = lastPlayersScore;

//High Scores
saveHighScore = e => {
    e.preventDefault()

    //Score results will be shown and User will input name
    const playerScore = {
        score: lastPlayersScore,
        name: playersName.value  
    }
    highScores.push(playerScore)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    //Only Top 7 High Scores will be Shown on Highscores Page
    highScores.splice(7)

    localStorage.setItem('leaderboard', JSON.stringify(leaderboard))
    window.location.assign('index.html')
};