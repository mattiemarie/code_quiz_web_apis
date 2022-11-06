//GAME OVER Values
const playersName = document.querySelector('#username')
const saveScoreButton = document.querySelector('#saveScoreButton')
const finalGameScore = document.querySelector('#finalScore')
const lastPlayersScore = localStorage.getItem('lastPlayerScore')

//LEADERBOARD
const playerscore = JSON.parse(localStorage.getItem('playerscore')) || []

//Max Number of Winners to be presented -
const MAX_LEADERBOARD_WINNERS = 7

finalGameScore.innerText = lastPlayersScore;

//Player's Score will be saved to the leaderboard
saveHighScore = e => {
    e.preventDefault()

    //Score results will be shown and Player will input name or initials
    const score = {
        score: lastPlayersScore,
        name: playersName.value  
    }
    //Player Score pushed to Leaderboard
    playerscore.push(score)

    //Leaderboard is being sorted by Highest to Lowest Score
    playerscore.sort((a,b) => {
        return b.score - a.score
    })

    //Only Top 7 High Scores will be Shown on Highscores Page
    playerscore.splice(7)

    
    localStorage.setItem('playerscore', JSON.stringify(playerscore))
    window.location.assign('index.html')
};