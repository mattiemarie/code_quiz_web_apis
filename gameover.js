//GAME OVER Values
const playersName = document.querySelector('#username')
const saveScoreButton = document.querySelector('#saveScoreButton')
const finalGameScore = document.querySelector('#finalScore')
const lastPlayersScore = localStorage.getItem('lastPlayersScore')

//LEADERBOARD Setup
const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || []
const MAX_LEADERBOARD_WINNERS = 5

finalGameScore.innerText = lastPlayersScore;

//Player's Score will be saved to the leaderboard
saveHighScore = e => {
    e.preventDefault()

    //Score results will be shown and Player will input name or initials
    const playerScore = {
        score: lastPlayersScore,
        name: playersName.value  
    }
    //Player Score pushed to Leaderboard
    leaderboard.push(playerScore)

    //Leaderboard is being sorted by Highest to Lowest Score
    leaderboard.sort((a,b) => {
        return b.score - a.score
    })

    //Only Top 7 High Scores will be Shown on Highscores Page
    leaderboard.splice(7)

    
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard))
    window.location.assign('index.html')
};