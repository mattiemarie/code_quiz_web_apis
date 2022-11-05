const leaderboardList = document.querySelector('.score-count');
const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

leaderboardList.innerHTML = 
leaderboard.map (leaderboardList => {
    return `<li class= 'score-count'> $(score.name)-$(score.score)</li>`
})
.join('');