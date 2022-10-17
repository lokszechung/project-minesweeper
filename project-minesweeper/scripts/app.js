function init() {
  // TODO do we have to think about mobile users?
  // TODO githubs

  // ** Elements **
  // TODO parent to appendChild to 
  const gridContainer = document.querySelector('.grid-container')
  // TODO timer which is also the score
  const timeScore = document.querySelector('.time-score')
  // TODO number of mines which is also number of flags available - depletes as flags or added back when unplaced
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
  let difficultySetting
  let choice 
  
  const difficulty = {
    beginner: { 
      width: 8,
      height: 8,
      mines: 10, 
    },
    intermediate: {
      width: 9,
      height: 9,
      mines: 2,
    },
    expert: {
      width: 30,
      height: 16,
      mines: 99,
    },

    custom: {
      width: '',
      height: '',
      mines: '',
    },
  }

  // TODO starting default grid

  let cell
  let cells = []
  let minesPlaced = 0
  let minePlacement = []

  function defaultGrid(){
    choice = 'beginner'
    difficultySetting = difficulty[choice]
    const cellCount = difficulty[choice].width * difficulty[choice].height
    gridContainer.innerHTML = ''
    
    for (let i = 0; i < cellCount; i++){
      cell = document.createElement('div')
      cell.classList.add('cell')
      cell.dataset.index = i
      // cell.innerHTML = i
      gridContainer.appendChild(cell)
      cells.push(cell)
    }

    gridContainer.style.width = `${difficulty[choice].width * 22}px`
    gridContainer.style.height = `${difficulty[choice].height * 22}px`

    function defaultRandomMines(){   
      minesPlaced = 0
      minePlacement = []   
      while (minesPlaced < difficulty.beginner.mines){

        const random = Math.floor(Math.random() * cells.length)
        const randomIndex = cells[random]
        if (!minePlacement.some(pos => pos === randomIndex)){
          minePlacement.push(randomIndex)
          minesPlaced++
        }    
      }
      minePlacement.forEach(cell => cell.classList.add('mine'))      
      
    }
    defaultRandomMines()

    // cells.forEach(cell => cell.addEventListener('click', mineClicked))
    
    cells.forEach(cell => cell.addEventListener('click', reveal))

  }
  defaultGrid()

  // TODO difficulty

  // const beginnerChoice = document.querySelector('.beginner')
  // const intermediateChoice = document.querySelector('.intermediate')
  // const expertChoice = document.querySelector('.expert')
  const difficultyChoice = document.querySelectorAll('.difficulty')

  // TODO Global functions 

  // function mineClicked(e){
  //   if (e.target.classList.contains('mine')){
  //     const allMines = document.querySelectorAll('.mine')
  //     allMines.forEach(cell => cell.classList.add('mine-clicked'))
  //   }
  // }

  difficultySetting = difficulty[choice]
  const cellCount = difficulty[choice].width * difficulty[choice].height

  // TODO reveal cell 

  // function opened(e){
  //   if (!e.target.classList.contains('mine')){
  //     e.target.classList.add('opened')
  //   }
  // }  
  // cells.forEach(cell => cell.addEventListener('click', opened))    

   

  function reveal(e){
  
    const target = e.target || e 
    const { dataset, classList } = target
    const currentCell = dataset.index   
    console.log(currentCell)
    const adjacent = []
    let minesAdjacent = []
    // TODO Numbered cell 

    if (classList.contains('flag')){
      return
    }  
  
    // function nextToMine(){
    if (!classList.contains('mine')){
      classList.add('opened')
      // check right
      if (currentCell % difficulty[choice].width !== difficulty[choice].width - 1){
        adjacent.push(cells[parseFloat(currentCell) + 1])
      }
      // check left
      if (currentCell % difficulty[choice].width !== 0){
        adjacent.push(cells[parseFloat(currentCell) - 1])
      }
      // check up
      if (currentCell >= difficulty[choice].width){
        adjacent.push(cells[parseFloat(currentCell) - difficulty[choice].width])
      }
      // check down 
      if (currentCell < cellCount - difficulty[choice].width){
        adjacent.push(cells[parseFloat(currentCell) + difficulty[choice].width])
      }
      // check up left
      if (currentCell >= difficulty[choice].width && currentCell % difficulty[choice].width !== 0){
        adjacent.push(cells[parseFloat(currentCell) - 1 - difficulty[choice].width])
      }
      // check up right
      if (currentCell >= difficulty[choice].width && currentCell % difficulty[choice].width !== difficulty[choice].width - 1){
        adjacent.push(cells[parseFloat(currentCell) + 1 - difficulty[choice].width])
      }
      // check down left
      if (currentCell < cellCount - difficulty[choice].width && currentCell % difficulty[choice].width !== 0){
        adjacent.push(cells[parseFloat(currentCell) - 1 + difficulty[choice].width]) 
      }
      // check down right
      if (currentCell < cellCount - difficulty[choice].width && currentCell % difficulty[choice].width !== difficulty[choice].width - 1){
        adjacent.push(cells[parseFloat(currentCell) + 1 + difficulty[choice].width])
      }
      console.log(adjacent)
      
      minesAdjacent = adjacent.filter(cell => cell.classList.contains('mine'))
      console.log(minesAdjacent)
    }  
    // }
    // nextToMine()  
  
    if (minesAdjacent.length === 0){
      console.log(adjacent)
      adjacent.forEach(cell => {
        if (!cell.classList.contains('opened')){
          reveal(cell) 
        }
      }) 
    } else {
      console.log(minesAdjacent)
      console.log(minesAdjacent.length)
      target.innerHTML = minesAdjacent.length
      console.log({ target })
    }

    if (classList.contains('mine')){
      const allMines = document.querySelectorAll('.mine')
      allMines.forEach(cell => cell.classList.add('mine-clicked'))
      console.log('Game over')
      cells.forEach(cell => {
        cell.style.pointerEvents = 'none'
      })
    }

    winCondition()
    
    // function gameOver(){
    //   cells.forEach(cell => cell.addEventListener('click', mineClicked))
    //   console.log('Game over')
    // }
    // gameOver()
  
  }

  // TODO win condition

  function winCondition(){
    const noMines = cellCount - difficulty[choice].mines
    console.log(cellCount)
    console.log(noMines)
    const openedCells = cells.filter(cell => cell.classList.contains('opened'))
    console.log(openedCells.length)
    if (noMines === openedCells.length){
      console.log('Winner')
      const allMines = document.querySelectorAll('.mine')
      allMines.forEach(cell => cell.classList.add('flag'))
      cells.forEach(cell => {
        cell.style.pointerEvents = 'none'
      })
    }
  }



  function difficultyOfGame(e){
    choice = e.target.id
    difficultySetting = difficulty[choice]

    // TODO squares in the grid // ! generated using JS

    const cellCount = difficulty[choice].width * difficulty[choice].height

    function createGrid(){
      gridContainer.innerHTML = ''
      cells = []
      for (let i = 0; i < cellCount; i++){
        const cell = document.createElement('div')
        cell.classList.add('cell')
        cell.dataset.index = i
        gridContainer.appendChild(cell)
        cells.push(cell)
      }
      gridContainer.style.width = `${difficulty[choice].width * 22}px`
      gridContainer.style.height = `${difficulty[choice].height * 22}px`

      function randomMines(){  
        cells.forEach(cell => cell.classList.remove('mine')) 
        minesPlaced = 0
        minePlacement = []  
        while (minesPlaced < difficulty[choice].mines){
          const random = Math.floor(Math.random() * cells.length)
          const randomIndex = cells[random]
          if (!minePlacement.some(pos => pos === randomIndex)){
            minePlacement.push(randomIndex)
            minesPlaced++
          }    
        }
        minePlacement.forEach(cell => cell.classList.add('mine'))  
      }
      randomMines()
    }

    createGrid()

    cells.forEach(cell => cell.addEventListener('click', reveal))

    cells.forEach(cell => cell.addEventListener('contextmenu', rightClick))
  }

  difficultyChoice.forEach(choice => choice.addEventListener('click', difficultyOfGame))

  // TODO tight click toggle flag

  function nothing(e){
    if (e.target.classList.contains('flag')){
      return
    }  
  }
  


  function rightClick(e){
    e.preventDefault()
    e.target.classList.toggle('flag')
  }

  cells.forEach(cell => cell.addEventListener('contextmenu', rightClick))

 


  // TODO button to start game - probably in the form of choosing difficulty

  // TODO high scores



  // ** Variables **

  // let count = 0
  // let time

  // ** Execution ** 

  function difficultyPicked(){
    // restarts the game after being picked
    // if statement to check difficulty
    // depending on difficulty, different board sizes and number of mines will be generated
    // Could have separate functions for easy, medium, hard board generation
    // ! Stretch: allow player to generate custom board size and mine count  
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
  // function gameOver(){
  //   cells.forEach(cell => cell.addEventListener('click', mineClicked))
  //   console.log('Game over')
  // }




  // function gameOver(){
  // clearInterval
  // game over overlay
  // restart option
  // ! Stretch: some animations 
  // }

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