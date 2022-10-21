function init() {
  // TODO do we have to think about mobile users?
  // TODO githubs

  // ** Elements **
  // TODO parent to appendChild to 
  const gridContainer = document.querySelector('.grid-container')
  const gameContainer = document.querySelector('.game-container')
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
  const howToPlayButton = document.querySelector('.how-to-play')
  const instructions = document.querySelector('.instructions')
  const closeButton = document.querySelector('.close-button')
  const customForm = document.querySelector('.custom-form')
  const customButton  = document.querySelector('.custom-button')
  const cancelButton = document.querySelector('.cancel')
  const timeWon = document.querySelector('.time')
  const diffChoice = document.querySelector('.diff-choice')
  const winnerBox = document.querySelector('.winner')
  const winCloseButton = document.querySelector('.close-button-win') 

  function gameDropdown(){
    gameContent.classList.toggle('show')
    // gameContainer.style.pointerEvents = 'none'
  }

  gameButton.addEventListener('click', gameDropdown)

  function helpDropdown(){
    helpContent.classList.toggle('show')
    // gameContainer.style.pointerEvents = 'none'
  }
  helpButton.addEventListener('click', helpDropdown)

  function instruct(){
    instructions.style.display = 'block'
    // gameContainer.style.pointerEvents = 'none'
  }
  howToPlayButton.addEventListener('click', instruct)

  function chooseCustom(){
    customForm.style.display = 'block'
    // gameContainer.style.pointerEvents = 'none'
  }
  customButton.addEventListener('click', chooseCustom)

  function showWinnerBox(){
    winnerBox.style.display = 'block'
    // gameContainer.style.pointerEvents = 'none'
  }

  // function preventAccident(){
  //   console.log(gameContainer)
  //   console.log(gameContent.classList.contains('show'))
  //   if (gameContent.classList.contains('show')){
  //     gameContainer.style.pointerEvents = 'none'
  //     console.log('cells should not click')
  //   }  
  // }
  // preventAccident()

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
      // gameContainer.style.pointerEvents = 'auto'
    }
  }
  window.addEventListener('click', clickOutGame)

  function clickOutHelp(e){
    if (e.target !== helpButton){
      helpContent.classList.remove('show')
      // setTimeout(() => {
      //   gameContainer.style.pointerEvents = 'auto'
      // }, 1000)
    }
  }
  window.addEventListener('click', clickOutHelp)

  function closeInstruct(){
    instructions.style.display = 'none'
    // gameContainer.style.pointerEvents = 'auto'
  }
  closeButton.addEventListener('click', closeInstruct)

  function closeForm(){
    customForm.style.display = 'none'
    // gameContainer.style.pointerEvents = 'auto'
  }
  // cancelButton.addEventListener('click', closeForm)

  function winClose(){
    winnerBox.style.display = 'none'
    // gameContainer.style.pointerEvents = 'auto'
  }
  winCloseButton.addEventListener('click', winClose)
  
  // TODO Custom difficulty form

  const customWidth = document.querySelector('.custom-width')
  const customHeight = document.querySelector('.custom-height')
  const customMines = document.querySelector('.custom-mines')
  const applyCustom = document.querySelector('.apply')
  
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
      width: 0,
      height: 0,
      mines: 0,
    },
    
    addCustom(e){
      e.preventDefault() 
      console.log(customWidth.value)
      console.log(difficulty)
      difficulty.custom.width = parseInt(customWidth.value)
      difficulty.custom.height = parseInt(customHeight.value)
      difficulty.custom.mines = parseInt(customMines.value)
      if (difficulty.custom.width > 6 && difficulty.custom.height > 3 && difficulty.custom.mines > 0 && difficulty.custom.mines < ((difficulty.custom.width - 1) * (difficulty.custom.height - 1))){
        difficultyOfGame(e)
        closeForm()
      }  
    },
  }  
  
  applyCustom.addEventListener('click', difficulty.addCustom)

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
  
  let choice = 'beginner'
  let difficultySetting = difficulty[choice]
  let cellCount = difficulty[choice].width * difficulty[choice].height

  createGrid()

  cells.forEach(cell => cell.addEventListener('click', reveal))

  cells.forEach(cell => cell.addEventListener('contextmenu', rightClickFlag))

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

  }
// before
  // TODO pick difficulty
  function difficultyOfGame(e){
    const target = e.target || e
    choice = target.id
    difficultySetting = difficulty[choice]
    cellCount = difficulty[choice].width * difficulty[choice].height

    createGrid()

    resetTimer()

    cells.forEach(cell => cell.addEventListener('click', reveal))

    cells.forEach(cell => cell.addEventListener('contextmenu', rightClickFlag))
  }

  // TODO reset game button
  function reset(){
    difficultySetting = difficulty[choice]
    const cellCount = difficulty[choice].width * difficulty[choice].height
    createGrid()
    executed = false
    cells.forEach(cell => cell.addEventListener('click', reveal))
    cells.forEach(cell => cell.addEventListener('contextmenu', rightClickFlag))
    console.log(executed)
    resetTimer()
  }

  emoji.addEventListener('click', reset)

  // TODO open squares recursive function and main game logic 
  function reveal(e){

    difficultySetting = difficulty[choice]
    console.log('setting ---> ' + difficulty[choice])
    const cellCount = difficulty[choice].width * difficulty[choice].height
    console.log('cellCount ---> ' + cellCount)
    const target = e.target || e 
    const { dataset, classList } = target
    const currentCell = dataset.index   
    const adjacent = []
    let minesAdjacent = []

    // TODO Numbered cell 
    // if (gameContent.style.display === 'block' || helpContent.style.display === 'block' || instructions.style.display === 'block' || customForm.style.display === 'block'){
    //   return
    // } 

    if (classList.contains('flag')){
      return
    }  

    // function nextToMine(){
    if (!classList.contains('mine')){
      timingScore()
      executed = true
      classList.add('opened')
      // check right
      console.log(currentCell)
      console.log(difficulty[choice].width)
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
    console.log(cells)

    if (minesAdjacent.length === 0){
      adjacent.forEach(cell => {
        if (!cell.classList.contains('opened')){
          reveal(cell) 
        }
      }) 
    } else {
      // target.removeAttribute('value')
      target.classList.add(openArray[minesAdjacent.length - 1])
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
      const openedCells = cells.filter(cell => cell.classList.contains('opened'))
      if (notMines === openedCells.length){
        notMines = 0
        setTimeout(() => {
          clearInterval(timer)
          clearInterval(secondsUnit)
          clearInterval(secondsTen)
          clearInterval(secondsHundred)
        }, 1)
        !count ? count = 0.1 : count = Math.round(count * 10) / 10
        timeWon.innerHTML = count
        diffChoice.innerHTML = choice
        emoji.id = 'win'
        const allMines = document.querySelectorAll('.mine')
        allMines.forEach(cell => cell.classList.add('flag'))
        cells.forEach(cell => {
          cell.style.pointerEvents = 'none'
        })
        setTimeout(() => {
          showWinnerBox()
        }, 1000)
      }
    }  
  }

  // TODO tight click toggle flag
  function rightClickFlag(e){
    e.preventDefault()
    if (e.target.id !== 'opened' && !openArray.includes(e.target.id)){
      e.target.classList.toggle('flag')
    }  
    countFlags()
  }

  // TODO flag counter
  function countFlags(){
    flaggedCells = cells.filter(cell => cell.classList.contains('flag'))
    flags = difficulty[choice].mines - flaggedCells.length
    if (flags >= 0 && flags < 10){
      flagHundred.removeAttribute('class')
      flagHundred.classList.add('zeronum')
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

  // TODO mousedown animation
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



// ** Events **


// 999 seconds goes to 000
//timer only logs counts if i am on the page, but clock continues
//mine can be clicked on first go
//high scores
//on the custom diff, if press cancel, breaks the game
//if a menu is opened up, click anywhere to close it, but the game will also trigger if a square is clicked, or reset if the reset button is clicked

