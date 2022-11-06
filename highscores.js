//Players Score/Players Score List is extracted from html/localstorage
const playersScoreList = document.querySelector('#playersScoreList');
const playerscore = JSON.parse(localStorage.getItem('playerscore')) || []


//Players Score List is presented to the Player in a list
playersScoreList.innerHTML = 
playerscore.map (score => {
    return `<li class= 'player-score'> $(score.name)-$(score.score)</li>`
})
.join('');