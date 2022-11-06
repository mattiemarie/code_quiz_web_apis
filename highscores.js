const playersScoreList = document.querySelector('#playersScoreList');
const playerscore = JSON.parse(localStorage.getItem('playerscore')) || []

playersScoreList.innerHTML = 
playerscore.map (score => {
    return `<li class= 'player-score'> $(score.name)-$(score.score)</li>`
})
.join('');