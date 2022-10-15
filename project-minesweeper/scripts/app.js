function init() {
  // do we have to think about mobile users?
  // githubs

  // ** Elements **
  // parent to appendChild to 
  const gridContainer = document.querySelector('.grid-container')
  // timer which is also the score
  const timeScore = document.querySelector('.time-score')
  // number of bombs which is also number of flags available - depletes as flags or added back when unplaced
  const flagCount = document.querySelector('.flag-count')
  // difficulty 
  // squares in the grid // ! generated using JS
  // buttons for help/options - to choose difficulty or reset
  // button to start game - probably in the form of choosing difficulty
  // flag 
  // bomb
  // high scores

  // object for difficult, within that has objects for E/M/D with keys for cellCount and bombs
  const difficulty = {
    beginner: { 
      width: 8,
      height: 8,
      bombs: 10, 
    },
    intermediate: {
      width: 16,
      height: 16,
      bombs: 40,
    },
    expert: {
      width: 30,
      height: 16,
      bombs: 99,
    },
  }


  // ** Variables **

  // let count = 0
  // let time

  // ** Execution ** 

  function difficultyPicked(){
    // restarts the game after being picked
    // if statement to check difficulty
    // depending on difficulty, different board sizes and number of bombs will be generated
    // Could have separate functions for easy, medium, hard board generation
    // ! Stretch: allow player to generate custom board size and bomb count  
  }

  function timeScore(){
    // clearInterval(timer)
    // setInterval, count++ every 1000ms, as soon a first square is clicked
  }

  function clickGrid(){
    // sqaures are either blank, bombs or numbers
    // Left click: reveals empty squares up to and including squares touching bombs (recursion) - then disable those squares
    // number on squares touching bombs - add class for number
    // right click: flag - toggle flag class - cannot place more flags than there are bombs
    // game over if bomb square clicked
    // win if only bombs squares unclicked
  }

  function flagCount(){
    // flag count to track flag class on grid
  }

  function gameOver(){
    // clearInterval
    // game over overlay
    // restart option
    // ! Stretch: some animations 
  }

  function win(){
    // win overlay
    // clearInterval
    // display score and show high scores
    // restart option (or automatically cleared)
    // ! Stretch: some animations 
  }
  function resetClick(){
    // reset the game to chosen difficulty
  }


  // ** Events **

  // button.addEventListener('click', clickGrid)
  // button.addEventListener('click', resetClick)
  // right click event 
}
window.addEventListener('DOMContentLoaded', init)