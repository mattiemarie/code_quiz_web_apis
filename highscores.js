const leaderboardList = document.querySelector('#leaderboardList');
const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

leaderboardList.innerHTML = leaderboard
.map(score => {
    return `<li class= "player-scores">$(score.name)-$(score.score)</li>`
})
.join('');