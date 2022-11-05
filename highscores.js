const number_of_scores = 5;
const highScores = 'highscores';

const highScoresList = localStorage.getItem(highScores);
const highscores = JSON.parse(highScoresList) ?? [];


// function showHighScores () {
// const highScoresList = document.querySelector('#highScoresList')
// const highScores = document.querySelector('#highScores') || []

// // Save List of Highscores


// highScoresList.innerHTML =
// highScores.map((score) => 
//  `<li>${score.score} - ${score.name}).join('');
// };