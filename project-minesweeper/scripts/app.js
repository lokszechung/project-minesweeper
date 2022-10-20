function init() {
  // TODO do we have to think about mobile users?
  // TODO githubs

  // ** Elements **
  // TODO parent to appendChild to 
  const gridContainer = document.querySelector('.grid-container')
  const layerFour = document.querySelector('.layer-four')
  const display = document.querySelector('.score-container')
  const centralBorder = document.querySelectorAll('.central-border')
  // TODO emoji
  const emoji = document.querySelector('.emoji')
  // TODO timer which is also the score
  const timeScore = document.querySelector('.time-score')
  // TODO number of mines which is also number of flags available - depletes as flags or added back when unplaced
  const flagCount = document.querySelector('.flag-count')
  // TODO reset button
  const resetButton = document.querySelector('.reset')
  // TODO buttons for help/options - to choose difficulty or reset
  const helpButton = document.querySelector('.help')
  const gameButton = document.querySelector('.game')
  const helpContent = document.querySelector('.help-content')
  const gameContent = document.querySelector('.game-content')
  
  function gameDropdown(){
    gameContent.classList.toggle('show')
  }

  gameButton.addEventListener('click', gameDropdown)

  function helpDropdown(){
    helpContent.classList.toggle('show')
  }
  helpButton.addEventListener('click', helpDropdown)

  // ! below will close dropdown when only outside window is clicked
  // function clickOut(e){
  //   if (!e.target.classList.contains('game')){
  //     gameContent.classList.remove('show')
  //   }
  // }
  // window.addEventListener('click', clickOut)
  
  // ! below will close dropdown when anything is clicked
  function clickOutGame(e){
    if (e.target !== gameButton){
      gameContent.classList.remove('show')
    }
  }
  window.addEventListener('click', clickOutGame)

  function clickOutHelp(e){
    if (e.target !== helpButton){
      helpContent.classList.remove('show')
    }
  }
  window.addEventListener('click', clickOutHelp)
  
    
  
  // TODO object for difficult
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
  
  

  let cell
  let cells = []
  let minesPlaced = 0
  let minePlacement = []


  let flags 
  let flaggedCells = []
  const flagUnit = document.querySelector('#flag-unit')
  const flagTen = document.querySelector('#flag-ten')
  const flagHundred = document.querySelector('#flag-hundred')
  const timeArray = [ 'zeronum', 'onenum', 'twonum', 'threenum', 'fournum', 'fivenum', 'sixnum', 'sevennum', 'eightnum', 'ninenum' ]

  const openArray = [ 'oneopen', 'twoopen', 'threeopen', 'fouropen', 'fiveopen', 'sixopen', 'sevenopen', 'eightopens' ]

  // TODO difficulty

  const difficultyChoice = document.querySelectorAll('.difficulty')

  // TODO Global functions 

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
      display.style.width = `${difficulty[choice].width * 24}px`
      layerFour.style.height = `${difficulty[choice].height * 24}px`
      centralBorder.forEach(border => border.style.width = `${difficulty[choice].width * 24}px`)

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
      emoji.id = 'smiley'

      randomMines()

      countFlags()

      // gridContainer.addEventListener('click' || 'contextmenu', timingScore, { once: true })
    }

    // TODO pick difficulty
    function difficultyOfGame(e){
      const target = e.target || e
      choice = target.id
      difficultySetting = difficulty[choice]
      cellCount = difficulty[choice].width * difficulty[choice].height

      createGrid()

      resetTimer()

      cells.forEach(cell => cell.addEventListener('click', reveal))

      cells.forEach(cell => cell.addEventListener('contextmenu', rightClick))
    }

    // TODO reset game button
    function reset(){
      difficultySetting = difficulty[choice]
      const cellCount = difficulty[choice].width * difficulty[choice].height
      createGrid()
      executed = false
      cells.forEach(cell => cell.addEventListener('click', reveal))
      cells.forEach(cell => cell.addEventListener('contextmenu', rightClick))
      console.log(executed)
      resetTimer()
    }
    
    emoji.addEventListener('click', reset)

    // TODO open squares recursive function and main game logic 
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
        console.log('before---> ' + executed)
        timingScore()
        executed = true
        console.log('after---> ' + executed)
        target.id = 'opened'
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
          if (cell.id !== 'opened'){
            reveal(cell) 
          }
        }) 
      } else {
        target.removeAttribute('id')
        target.id = openArray[minesAdjacent.length - 1]
      }

      if (classList.contains('mine')){
        const allMines = document.querySelectorAll('.mine')
        allMines.forEach(cell => cell.classList.add('mine-clicked'))
        classList.add('main-mine')
        console.log('Game over')
        emoji.id = 'lose'
        cells.forEach(cell => {
          cell.style.pointerEvents = 'none'
        })
        setTimeout(() => {
          clearInterval(timer)
          clearInterval(secondsUnit)
          clearInterval(secondsTen)
          clearInterval(secondsHundred)
        }, 1)
      }

      winCondition()

    
    }

    const hasNum = []

    // TODO win condition
    function winCondition(){
      difficultySetting = difficulty[choice]
      const cellCount = difficulty[choice].width * difficulty[choice].height
      if (cellCount !== difficulty[choice].mines){ //otherwise win and game over shows at the same time
        let notMines 
        notMines = cellCount - difficulty[choice].mines
        const openedCells = cells.filter(cell => cell.id === 'opened' || openArray.includes(cell.id))
        if (notMines === openedCells.length){
          notMines = 0
          setTimeout(() => {
            clearInterval(timer)
            clearInterval(secondsUnit)
            clearInterval(secondsTen)
            clearInterval(secondsHundred)
          }, 1)
          !count ? console.log('Winner, you took 0.1 seconds.') : console.log(`Winner, you took ${Math.round(count * 10) / 10} seconds.`)
          emoji.id = 'win'
          const allMines = document.querySelectorAll('.mine')
          allMines.forEach(cell => cell.classList.add('flag'))
          cells.forEach(cell => {
            cell.style.pointerEvents = 'none'
          })
        }
      }  
    }

    // TODO tight click toggle flag
    function rightClick(e){
      e.preventDefault()
      e.target.classList.toggle('flag')
      countFlags()
    }
    
    // TODO flag counter
    function countFlags(){
      flaggedCells = cells.filter(cell => cell.classList.contains('flag'))
      flags = difficulty[choice].mines - flaggedCells.length
      if (flags >= 0 && flags < 10){
        flagTen.removeAttribute('class')
        flagTen.classList.add('zeronum')
        flagUnit.removeAttribute('class')
        flagUnit.classList.add(timeArray[flags])
      }  
      if (flags >= 10){
        const minesString = flags.toString()
        const numSplitArray = minesString.split('')
        flagHundred.removeAttribute('class')
        flagHundred.classList.add('zeronum')
        flagTen.removeAttribute('class')
        flagUnit.removeAttribute('class')
        flagTen.classList.add(timeArray[numSplitArray[0]])
        flagUnit.classList.add(timeArray[numSplitArray[1]])
      }
      if (flags >= 100){
        const minesString = flags.toString()
        const numSplitArray = minesString.split('')
        flagUnit.removeAttribute('class')
        flagTen.removeAttribute('class')
        flagTen.removeAttribute('class')
        flagHundred.classList.add(timeArray[numSplitArray[0]])
        flagTen.classList.add(timeArray[numSplitArray[1]])
        flagUnit.classList.add(timeArray[numSplitArray[2]])
      }
      if (flags < 0 && flags > -10){
        flagHundred.removeAttribute('class')
        flagHundred.classList.add('blank')
        flagTen.removeAttribute('class')
        flagTen.classList.add('minus')
        flagUnit.removeAttribute('class')
        flagUnit.classList.add(timeArray[Math.abs(flags)])
      }
      if (flags <= -10){
        const minesString = Math.abs(flags).toString()
        const numSplitArray = minesString.split('')
        flagHundred.removeAttribute('class')
        flagHundred.classList.add('minus')
        flagTen.removeAttribute('class')
        flagUnit.removeAttribute('class')
        flagTen.classList.add(timeArray[numSplitArray[0]])
        flagUnit.classList.add(timeArray[numSplitArray[1]])
      }
    }
    
    
    function emojiMouseDown(e){
      if (emoji.id !== 'lose' && emoji.id !== 'win'){
        if (!e.target.id && !e.target.classList.contains('flag')){
          emoji.id = 'shock'
        }  
      }  
    }      
    gridContainer.addEventListener('mousedown', emojiMouseDown)

    function emojiMouseUp(){
      if (emoji.id !== 'lose' && emoji.id !== 'win'){
        emoji.id = 'smiley'
      }
    }  
    gridContainer.addEventListener('mouseup', emojiMouseUp)

  }
  start()

  // TODO declare variables for timerScore 
  let timer
  let secondsUnit
  let secondsTen
  let secondsHundred
  let unit
  let ten
  let hundred
  let count
  const secUnit = document.querySelector('#sec-unit')
  const secTen = document.querySelector('#sec-ten')
  const secHundred = document.querySelector('#sec-hundred')
  // const timeArray = [ 'zeronum', 'onenum', 'twonum', 'threenum', 'fournum', 'fivenum', 'sixnum', 'sevennum', 'eightnum', 'ninenum' ]
  
  // TODO timer and Score
  let executed = false

  function timingScore(){
    if (executed === true){
      return
    }  

    if (executed === false){
      unit = 1
      ten = 1
      hundred = 1
      count = 0

      timer = setInterval(() => {
        count += 0.1
        // console.log(count)
        if (count > 999){
          clearInterval(secondsUnit)
          clearInterval(secondsTen)
          clearInterval(secondsHundred)
        }
      }, 100)

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

  }  

  // TODO reset timer
  function resetTimer(){
    console.log('timer reset')
    clearInterval(timer)
    clearInterval(secondsUnit)
    clearInterval(secondsTen)
    clearInterval(secondsHundred)
    secUnit.removeAttribute('class')
    secUnit.classList.add('zeronum')
    secTen.removeAttribute('class')
    secTen.classList.add('zeronum')
    secHundred.removeAttribute('class')
    secHundred.classList.add('zeronum')
  }


}

window.addEventListener('DOMContentLoaded', init)

// TODO high scores



// ** Variables **


// ** Execution ** 





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



// ** Events **


// 999 seconds goes to 000






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




//timer only logs counts if i am on the page, but clock continues
//mine can be clicked on first go
//custom levels
//high scores
