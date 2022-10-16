function init() {
  // TODO do we have to think about mobile users?
  // TODO githubs

  // ** Elements **
  // TODO parent to appendChild to 
  const gridContainer = document.querySelector('.grid-container')
  // TODO timer which is also the score
  const timeScore = document.querySelector('.time-score')
  // TODO number of bombs which is also number of flags available - depletes as flags or added back when unplaced
  const flagCount = document.querySelector('.flag-count')
  // TODO buttons for help/options - to choose difficulty or reset
  const gameButton = document.querySelector('.game')
  const gameContent = document.querySelector('.game-content')
  function gameDropdown(){
    gameContent.classList.toggle('show')
  }

  gameButton.addEventListener('click', gameDropdown)

  // ! below will close dropdown when only outside window is clicked
  // function clickOut(e){
  //   if (!e.target.classList.contains('game')){
  //     gameContent.classList.remove('show')
  //   }
  // }
  // window.addEventListener('click', clickOut)
  
  // ! below will close dropdown when anything is clicked
  function clickOut(e){
    if (e.target !== gameButton){
      gameContent.classList.remove('show')
    }
  }
  window.addEventListener('click', clickOut)
  
  // TODO object for difficult, within that has objects for E/M/D with keys for cellCount and bombs
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

    custom: {
      width: '',
      height: '',
      bombs: '',
    },
  }

  // TODO starting default grid

  let cells = []
  let bombsPlaced = 0
  let bombPlacement = []

  function defaultGrid(){
    gridContainer.innerHTML = ''
    for (let i = 0; i < 64; i++){
      const cell = document.createElement('div')
      cell.classList.add('square')
      cell.innerHTML = i
      gridContainer.appendChild(cell)
      cells.push(cell)
    }

    gridContainer.style.width = `${difficulty.beginner.width * 22}px`
    console.log(gridContainer.style.width)
    gridContainer.style.height = `${difficulty.beginner.height * 22}px`
    console.log(gridContainer.style.height)

    console.log(difficulty.beginner.bombs)


    function defaultRandomBombs(){   
      bombsPlaced = 0
      bombPlacement = []   
      while (bombsPlaced < difficulty.beginner.bombs){

        const random = Math.floor(Math.random() * cells.length)
        const randomIndex = cells[random]
        if (!bombPlacement.some(pos => pos === randomIndex)){
          bombPlacement.push(randomIndex)
          bombsPlaced++
        }    
      }
      bombPlacement.forEach(square => square.classList.add('mine'))      
      
    }
    defaultRandomBombs()
  }
  defaultGrid()

  // TODO difficulty

  // const beginnerChoice = document.querySelector('.beginner')
  // const intermediateChoice = document.querySelector('.intermediate')
  // const expertChoice = document.querySelector('.expert')
  const difficultyChoice = document.querySelectorAll('.difficulty')

  let difficultySetting
  let choice 

  function difficultyOfGame(e){
    choice = e.target.id
    console.log(choice)
    difficultySetting = difficulty[choice]
    console.log(difficultySetting)

    // TODO squares in the grid // ! generated using JS

    const cellCount = difficulty[choice].width * difficulty[choice].height

    function createGrid(){
      gridContainer.innerHTML = ''
      cells = []
      for (let i = 0; i < cellCount; i++){
        const cell = document.createElement('div')
        cell.classList.add('square')
        cell.innerHTML = i
        gridContainer.appendChild(cell)
        cells.push(cell)
      }

      gridContainer.style.width = `${difficulty[choice].width * 22}px`
      gridContainer.style.height = `${difficulty[choice].height * 22}px`

      function randomBombs(){  
        console.log(cells)
        cells.forEach(square => square.classList.remove('mine')) 
        bombsPlaced = 0
        bombPlacement = []  
        console.log('after clear-->' + bombPlacement) 
        console.log(difficulty[choice].bombs)
        while (bombsPlaced < difficulty[choice].bombs){
          const random = Math.floor(Math.random() * cells.length)
          console.log('cell -->' + random)
          const randomIndex = cells[random]
          console.log('RI -->' + randomIndex)
          if (!bombPlacement.some(pos => pos === randomIndex)){
            bombPlacement.push(randomIndex)
            bombsPlaced++
          }    
        }
        console.log('bombs at -->' + bombPlacement) 
        bombPlacement.forEach(square => square.classList.add('mine'))  
        console.log('bb length -- >' + bombPlacement.length)
        
      }
      randomBombs()


    }

    createGrid()


  }

  difficultyChoice.forEach(choice => choice.addEventListener('click', difficultyOfGame))




  

  // TODO button to start game - probably in the form of choosing difficulty
  // TODO flag 
  // TODO bomb
  // TODO high scores



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

  function timingScore(){
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

  function flagCounting(){
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