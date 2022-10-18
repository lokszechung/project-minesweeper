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
  // TODO reset button
  const resetButton = document.querySelector('.reset')
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
      mines: 10, 
    },
    intermediate: {
      width: 16,
      height: 16,
      mines: 40,
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
  
  // let choice = 'beginner'
  // let difficultySetting = difficulty[choice]
  

  // TODO starting default grid

  let cell
  let cells = []
  let minesPlaced = 0
  let minePlacement = []

  // function start(){
  //   function defaultGrid(){
  //     choice = 'beginner'
  //     difficultySetting = difficulty[choice]
  //     const cellCount = difficulty[choice].width * difficulty[choice].height
  //     gridContainer.innerHTML = ''
      
  //     for (let i = 0; i < cellCount; i++){
  //       cell = document.createElement('div')
  //       cell.classList.add('cell')
  //       cell.dataset.index = i
  //       // cell.innerHTML = i
  //       gridContainer.appendChild(cell)
  //       cells.push(cell)
  //     }

  //     gridContainer.style.width = `${difficulty[choice].width * 22}px`
  //     gridContainer.style.height = `${difficulty[choice].height * 22}px`

  //     function defaultRandomMines(){   
  //       minesPlaced = 0
  //       minePlacement = []   
  //       while (minesPlaced < difficulty.beginner.mines){

  //         const random = Math.floor(Math.random() * cells.length)
  //         const randomIndex = cells[random]
  //         if (!minePlacement.some(pos => pos === randomIndex)){
  //           minePlacement.push(randomIndex)
  //           minesPlaced++
  //         }    
  //       }
  //       minePlacement.forEach(cell => cell.classList.add('mine'))      
        
  //     }
  //     defaultRandomMines()
      
  //     cells.forEach(cell => cell.addEventListener('click', reveal))

  //   }
  //   defaultGrid()
  // }
  // start()

  // function reset(e){
  //   difficulty[choice] = 'beginner'
  //   const cellCount = difficulty[choice].width * difficulty[choice].height
  //   defaultGrid()
  //   cells.forEach(cell => cell.addEventListener('click', reveal))
  //   cells.forEach(cell => cell.addEventListener('contextmenu', rightClick))
  // }
  // resetButton.addEventListener('click', reset)

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

  // difficultySetting = difficulty[choice]
  // const cellCount = difficulty[choice].width * difficulty[choice].height

  // TODO reveal cell 

  // function opened(e){
  //   if (!e.target.classList.contains('mine')){
  //     e.target.classList.add('opened')
  //   }
  // }  
  // cells.forEach(cell => cell.addEventListener('click', opened))    

   

  

  // TODO reset 

  // function reset(e){
  //   const resetButton = document.querySelector('.reset')
  // }

  function start(){
  
    let choice = 'beginner'
    let difficultySetting = difficulty[choice]
    let cellCount = difficulty[choice].width * difficulty[choice].height
    
    createGrid()

    cells.forEach(cell => cell.addEventListener('click', reveal))
    
    cells.forEach(cell => cell.addEventListener('contextmenu', rightClick))
    
    difficultyChoice.forEach(choice => choice.addEventListener('click', difficultyOfGame))
    
    resetButton.addEventListener('click', reset)


    // TODO create grid using JS
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
      gridContainer.style.width = `${difficulty[choice].width * 24}px`
      gridContainer.style.height = `${difficulty[choice].height * 24}px`

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

      gridContainer.addEventListener('click' || 'contextmenu', timingScore, { once: true })
    }

    // TODO pick difficulty
    function difficultyOfGame(e){
      const target = e.target || e
      choice = target.id
      console.log(choice)
      difficultySetting = difficulty[choice]
      console.log(difficultySetting)
      cellCount = difficulty[choice].width * difficulty[choice].height
      console.log(cellCount)

      createGrid()

      cells.forEach(cell => cell.addEventListener('click', reveal))

      cells.forEach(cell => cell.addEventListener('contextmenu', rightClick))
    }

    // TODO reset button
    function reset(e){
      difficultySetting = difficulty[choice]
      console.log(difficulty[choice])
      const cellCount = difficulty[choice].width * difficulty[choice].height
      createGrid()
      cells.forEach(cell => cell.addEventListener('click', reveal))
      cells.forEach(cell => cell.addEventListener('contextmenu', rightClick))
      
      resetTimer()
    }
    
    // TODO open squares recursive function and main gameplay
    function reveal(e){
      
      difficultySetting = difficulty[choice]
      const cellCount = difficulty[choice].width * difficulty[choice].height
    
      const target = e.target || e 
      const { dataset, classList } = target
      const currentCell = dataset.index   
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
        
        minesAdjacent = adjacent.filter(cell => cell.classList.contains('mine'))
      }  
      // }
      // nextToMine()  
    
      if (minesAdjacent.length === 0){
        adjacent.forEach(cell => {
          if (!cell.classList.contains('opened')){
            reveal(cell) 
          }
        }) 
      } else {
        target.innerHTML = minesAdjacent.length
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

    
    }

    // TODO win condition
    function winCondition(){
      difficultySetting = difficulty[choice]
      const cellCount = difficulty[choice].width * difficulty[choice].height
      let notMines 
      notMines = cellCount - difficulty[choice].mines
      const openedCells = cells.filter(cell => cell.classList.contains('opened'))
      if (notMines === openedCells.length){
        notMines = 0
        console.log('Winner')
        const allMines = document.querySelectorAll('.mine')
        allMines.forEach(cell => cell.classList.add('flag'))
        cells.forEach(cell => {
          cell.style.pointerEvents = 'none'
        })
      }
    }

    // TODO tight click toggle flag
    function rightClick(e){
      e.preventDefault()
      e.target.classList.toggle('flag')
    }
    
  }
  start()

  let secondsUnit
  let secondsTen
  let secondsHundred
  let timer
  let unit 
  let ten 
  let hundred 
  let count 
  const secUnit = document.querySelector('#sec-unit')
  const secTen = document.querySelector('#sec-ten')
  const secHundred = document.querySelector('#sec-hundred')

  const timeArray = [ 'zerosec', 'onesec', 'twosec', 'threesec', 'foursec', 'fivesec', 'sixsec', 'sevensec', 'eightsec', 'ninesec' ]
  
  function timingScore(){
    
    unit = 1
    ten = 1
    hundred = 1
    count = 0

    timer = setInterval(() => {
      count++
      console.log(count)
    }, 1000)

    secondsUnit = setInterval(() => {
      if (unit === 0){
        secUnit.classList.remove(timeArray[9])
      } else {
        secUnit.classList.remove(timeArray[unit - 1])
      }
      secUnit.classList.add(timeArray[unit])
      unit++
      if (unit >= timeArray.length){
        unit = 0
      }
    }, 1000)
  

    secondsTen = setInterval(() => {
      if (ten === 0){
        secTen.classList.remove(timeArray[9])
      } else {
        secTen.classList.remove(timeArray[ten - 1])
      }
      secTen.classList.add(timeArray[ten])
      ten++
      if (ten >= timeArray.length){
        ten = 0
      }
    }, 10000)  


    secondsHundred = setInterval(() => {
      if (hundred === 0){
        secHundred.classList.remove(timeArray[9])
      } else {
        secHundred.classList.remove(timeArray[hundred - 1])
      }
      secHundred.classList.add(timeArray[hundred])
      hundred++
      if (hundred >= timeArray.length){
        hundred = 0
      }
    }, 100000)  
  }  

  // TODO reset timer

  function resetTimer(){
    clearInterval(timer)
    clearInterval(secondsUnit)
    clearInterval(secondsTen)
    clearInterval(secondsHundred)
    secUnit.removeAttribute('class')
    secUnit.classList.add('zerosec')
    secTen.removeAttribute('class')
    secTen.classList.add('zerosec')
    secHundred.removeAttribute('class')
    secHundred.classList.add('zerosec')
  }


}


// TODO high scores



// ** Variables **

// let count = 0
// let time

// ** Execution ** 


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
// function resetClick(){
// reset the game to chosen difficulty
// }


// ** Events **


window.addEventListener('DOMContentLoaded', init)






// function getKey(difficulty, value){
//   return Object.keys(difficulty).find(key => difficulty[key] === value)
// }
// console.log(getKey(difficulty, difficulty[choice]))

// resetButton.id = ''
// resetButton.id = getKey(difficulty, difficulty[choice])


// function clickGrid(){
// sqaures are either blank, bombs or numbers
// Left click: reveals empty squares up to and including squares touching bombs (recursion) - then disable those squares
// number on squares touching bombs - add class for number
// right click: flag - toggle flag class - cannot place more flags than there are bombs
// game over if bomb square clicked
// win if only bombs squares unclicked
// }

// function difficultyPicked(){
// restarts the game after being picked
// if statement to check difficulty
// depending on difficulty, different board sizes and number of mines will be generated
// Could have separate functions for easy, medium, hard board generation
// ! Stretch: allow player to generate custom board size and mine count  
// }

// function nothing(e){
//   if (e.target.classList.contains('flag')){
//     return
// }