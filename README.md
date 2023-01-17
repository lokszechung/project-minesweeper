# Minesweeper

Welcome to my first ever software development project! 

Minesweeper was completed on week 4 of General Assembly's Software Engineering bootcamp. I chose to build this Minesweeper game because it is a childhood favourite of mine, and I was intrigued by the challenge of coding the game’s logic.

- **Project timeframe:** 7 days
- **Team size:** Solo project

[Have a go here!](https://lokszechung.github.io/project-minesweeper/)

![Minesweeper](/readme-images/minesweeper-sc.png)

#### Technologies Used
- JavaScript
- HTML5
- CSS3
- Git & GitHub

#### Brief
- Render a game in the browser
- Be built on a grid: do not use HTML Canvas for this
- Design logic for winning & visually display which player won
- Include separate HTML / CSS / JavaScript files
- Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles
- Use Javascript for DOM manipulation
- Deploy your game online
- Use semantic markup for HTML and CSS

---

## Planning

### Wireframe & Pseudocode - Day 1

I started by planning the game design by wireframing on Excalidraw, and by pseudocoding the game's logic and breaking down the project into the DOM elements, variables, functions and event listeners. This made it easier to visualise the code, split the project into manageable tasks, and decide which features were to be prioritised. 

![wireframe](/readme-images/excalidraw.png)

---

## Build Process

### Creating the Grid - Day 1 to 2

The first step in the process was to generate the grid for minesweeper. The grid had to be able to be automatically generated upon page loading, as well as being regenerated each time the difficulty was changed. Then, the mines had to be randomly distributed in the grid according to the number of mines allocated for that difficulty. 

1. A ```difficulty``` object is defined, with each key being a difficulty level, which themselves are objects containing keys that define the width and height of the grid and the mines to be generated.

```js
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
  }
}  
```
2. Variables needed to create the grid are globally defined, but these can also be reused later. The ```choice``` variable is set to beginner at the start, so that by default, the game is on beginner diffculty.
```js
let cell
let cells = []
let minesPlaced 
let minePlacement
```
```js
let choice = 'beginner'
let difficultySetting = difficulty[choice]
let cellCount = difficulty[choice].width * difficulty[choice].height
```
3. In the ```createGrid function```, I ensured that the ```gridContainer``` was empty, in case there were cells in there from previous games. The ```cells``` array is also emptied. Then I used a for loop to count each required cell, generate that number, and set the CSS for ```gridContainer``` height and width so that the generated cells would fit within the desired dimensions. Each cell is assigned a ```cell``` class a data-index value.

4. The ```randomMines``` function randomly distributes mines across the grid. This was done by using a while loop to randomly select cells and checking if it exists in the ```minePlacement``` array. If not, then the cell is pushed into that array. This continues to loop until the amount of mines in the array equals the number of mines allocated in the object. Then for each cell in the array, a class of ```mine``` was assigned. 
```js
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
  randomMines()
}
```
5. The ```difficultyOfGame``` function takes the id of a difficulty selected and matches that to the corresponding difficulty in the object. The grid is then created accordingly. 
```js
function difficultyOfGame(e){
  const target = e.target || e
  choice = target.id
  difficultySetting = difficulty[choice]
  cellCount = difficulty[choice].width * difficulty[choice].height
  createGrid()
}
```

### Main Game Logic - Day 2 to 3

The second step in the process was to create the reveal function, which contained the main logic of the game play. 

1. When the player clicks on a cell, I first check to see whether it is a mine or if it is empty. If empty, it should display the number of mines adjacent to the cell. To achieve this, if the cell is not hiding a mine, then I check all 8 directions to see if a cell exists. If it exists, push that cell into the ```adjacent``` array. Then using the filter method, I filter through the adjacent array for any cell that includes a mine and I get the ```minesAdjacent``` array. The length of this array hence indicates the number of mines next to it. When each cell is checked, it is assigned a class of ```opened```.
```js
if (!classList.contains('mine')){
  classList.add('opened')
  if (currentCell % difficulty[choice].width !== difficulty[choice].width - 1){
    adjacent.push(cells[parseFloat(currentCell) + 1])
  }
  if (currentCell % difficulty[choice].width !== 0){
    adjacent.push(cells[parseFloat(currentCell) - 1])
  }
  if (currentCell >= difficulty[choice].width){
    adjacent.push(cells[parseFloat(currentCell) - difficulty[choice].width])
  }
  if (currentCell < cellCount - difficulty[choice].width){
    adjacent.push(cells[parseFloat(currentCell) + difficulty[choice].width])
  }
  if (currentCell >= difficulty[choice].width && currentCell % difficulty[choice].width !== 0){
    adjacent.push(cells[parseFloat(currentCell) - 1 - difficulty[choice].width])
  }
  if (currentCell >= difficulty[choice].width && currentCell % difficulty[choice].width !== difficulty[choice].width - 1){
    adjacent.push(cells[parseFloat(currentCell) + 1 - difficulty[choice].width])
  }
  if (currentCell < cellCount - difficulty[choice].width && currentCell % difficulty[choice].width !== 0){
    adjacent.push(cells[parseFloat(currentCell) - 1 + difficulty[choice].width]) 
  }
  if (currentCell < cellCount - difficulty[choice].width && currentCell % difficulty[choice].width !== difficulty[choice].width - 1){
    adjacent.push(cells[parseFloat(currentCell) + 1 + difficulty[choice].width])
  }
  minesAdjacent = adjacent.filter(cell => cell.classList.contains('mine'))
}  
```
2. The next part of this function is the recursive function. The ```reveal``` function is used when a cell is clicked and opened. If a cell opened has 0 mines adjacent to it, then the user knows they can safely open all 8 surrounding cells until they hit a numbered cell, which indicates the number of mines it is adjacent to. To eliminate the user having to open each cell manually when it has 0 mines nearby, I had to write a function that automatically opened these surrounding cells until a numbered cell is hit. If the minesAdjacent array is empty, then using the forEach method, each cell is passed as the argument back into the ```reveal``` function. Otherwise, it's given a classlist from an array called ```openArray```, according to the length of the minesAdjacent array. Here I also defined what happens when a mine cell is clicked on. I give each mine a ```mine-clicked``` class, change the emoji to the ```dead``` emoji and ```clearInterval``` for the timer. I also set CSS ```pointerEvents``` to none to avoid the player clicking cells after the loss. 

```js
function reveal(e){

  difficultySetting = difficulty[choice]
  const cellCount = difficulty[choice].width * difficulty[choice].height
  const target = e.target || e 
  const { dataset, classList } = target
  const currentCell = dataset.index   
  const adjacent = []
  let minesAdjacent = []

  if (!classList.contains('mine')){
    classList.add('opened')
    if (currentCell % difficulty[choice].width !== difficulty[choice].width - 1){
      adjacent.push(cells[parseFloat(currentCell) + 1])
    }
    if (currentCell % difficulty[choice].width !== 0){
      adjacent.push(cells[parseFloat(currentCell) - 1])
    }
    if (currentCell >= difficulty[choice].width){
      adjacent.push(cells[parseFloat(currentCell) - difficulty[choice].width])
    }
    if (currentCell < cellCount - difficulty[choice].width){
      adjacent.push(cells[parseFloat(currentCell) + difficulty[choice].width])
    }
    if (currentCell >= difficulty[choice].width && currentCell % difficulty[choice].width !== 0){
      adjacent.push(cells[parseFloat(currentCell) - 1 - difficulty[choice].width])
    }
    if (currentCell >= difficulty[choice].width && currentCell % difficulty[choice].width !== difficulty[choice].width - 1){
      adjacent.push(cells[parseFloat(currentCell) + 1 - difficulty[choice].width])
    }
    if (currentCell < cellCount - difficulty[choice].width && currentCell % difficulty[choice].width !== 0){
      adjacent.push(cells[parseFloat(currentCell) - 1 + difficulty[choice].width]) 
    }
    if (currentCell < cellCount - difficulty[choice].width && currentCell % difficulty[choice].width !== difficulty[choice].width - 1){
      adjacent.push(cells[parseFloat(currentCell) + 1 + difficulty[choice].width])
    }
    minesAdjacent = adjacent.filter(cell => cell.classList.contains('mine'))
  }  
  if (minesAdjacent.length === 0){
    adjacent.forEach(cell => {
      if (!cell.classList.contains('opened')){
        reveal(cell) 
      }
    }) 
  } else {
    target.classList.add(openArray[minesAdjacent.length - 1])
  }
}
```
3. In order that the player cannot lose on the first go, the function includes a check that ensures that if a cell with a ‘mine’ class is picked but no cells are opened yet, then the ```mine``` class is removed and reassigned to another cell that does not already have a mine.
```js
const howManyOpened = cells.filter(cell => cell.classList.contains('opened'))

if (howManyOpened.length === 0 && classList.contains('mine')){
  minePlacement = minePlacement.filter(cell => { 
    console.log(cell.dataset.index, currentCell) 
    return cell.dataset.index !== currentCell
  })
  classList.remove('mine')
  minesPlaced--    
  while (minesPlaced < difficulty[choice].mines){
    const random = Math.floor(Math.random() * cells.length)
    const randomIndex = cells[random]
    if (!minePlacement.some(pos => pos === randomIndex)){
      randomIndex.classList.add('mine')
      minePlacement.push(randomIndex)
      minesPlaced++
    }    
  }
}
```
### Win Condition - Day 4

Having completed the main game logic, I now needed the win (and lose) condition. 

1. The lose condition was simple, if a cell was clicked on and it contained a class of ```mine```, then the player loses. 
2. For the win condition,  I first defined a ```notMines``` variable. This variable is assigned the value of the total cell count minus the total mines on the grid. Then another variable called ```openedCells``` was defined, which is an array produced from filtering through the full array of cells for cells with the ```opened``` class. If ```notMines``` and ```openedCells``` length are the same, that means all cells but those with mines are opened, and therefore the player wins. Change the emoji to the win emoji, ```clearInterval``` for the timer (but delay it ever so slightly with ```setTimeout```, otherwise if the player wins instantaneously and the timer continues to run). I also ran the ```showWinnerBox``` function after a short while to display the time taken. 
```js
function winCondition(){
  if (cellCount !== difficulty[choice].mines){ 
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
```
### Other Features - Day 4 - 6 

Now that I had a functional game, I spent a couple of days working on the features outside of the main game logic. This included the visual features when a cell is clicked (flags, numbers, bombs etc), a timer and a flag counter, a reset function and the dropdowns for difficuilty selection and instructions. I documented some of the processes below. 

**Flagging a Cell**

I added an event listener for the right click mouse event to flag a cell. The ```preventDefault``` method ensures the context menu does not appear. Then a check to ensure the cell is not already opened and does not have a number, then toggle a class of flag. 
```js
function rightClickFlag(e){
  e.preventDefault()
  if (e.target.id !== 'opened' && !openArray.includes(e.target.id)){
    e.target.classList.toggle('flag')
  }  
  countFlags()
}
cells.forEach(cell => cell.addEventListener('contextmenu', rightClickFlag))
```

**Flag Counter**

At the start of the game the left hand counter indicates the number of mines in the grid. As the player flags cells, this number will be minus for each cell flagged. Since I used images to display each number, I created a timeArray containing strings that corresponded to classes which on CSS changed the image accordingly. The number of flags counter number is turned into a string value, then split, to create an array of which the items are each individual character of the number. Then according to each number, assign that div the corresponding class according to the position in the array. 
```js
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
```

**Timer**

The timer on the top right is also used for scoring. The timer uses individual images on the top right, so they would have to change every 1 second, 10 seconds and 100 seconds. A similar technique was used here to the flag counter, where an array for classes was defined. Then a ```setInterval``` to change the numbers each second etc. An invisible timer would also run, counting every 0.1 second. Once the clock reaches 999, it should ```clearInterval``` to avoid the clock returning to 000. A variable of execution was also declared, to ensure that the clock only activates if ```executed === false```. This is to ensure that when the clock is initiated when the first cell is clicked, it will not start another timer when another cell is clicked, until the timer is reset.
```js
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
```
```js
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
```

I used the remainder of the project time to finish any CSS I had yet to complete, making sure that I got it to look as nostalgic as possible. I also used this time to fix bugs and issues that had not already been dealt with, and refactor the code along the way.

### Bugs

- The clock runs as a usual clock would, but the timer behind-the-scenes only runs when the player is actively on the page in the browser.
- When selecting a custom difficulty, there is no close or exit button for the pop-up. The player must input in the height, width and mines, and press OK to close the modal. 
- Not optimised for mobile viewing, but sill works to some extent. 

---

## Reflection

### Challenges 

- Recursive functions were new to me, so I had to do my own research on it and upon first implementation, it was running an infinite loop. I later figured out that I had not included a condition for which the recursive function should end. 
- Since this was my first project, it was difficult to gauge how much time was too much, or too little, to spend on different elements of the projects.
- Keeping my code DRY, and adhereing to KISS was a challenge; I often kept getting lost in my own code. I found that refactoring code and separating large functions into several, smaller functions helped to keep my code easier to read, navigate and understand. 

### Wins

- Using JavaScript, HTML and CSS to create a functioning game within a week, that looks good too! I was pleasantly surprised myself.
- Learning recursive functions, as this was something I had learned independently and not a part of the main course syllabus. 
- Time and project management - I ensured that a day before the deadline, I had the whole project working to a good standard, so that on the final day I wouldn't have to rush to get things done, and only have to iron out minor issues. 

### Key Takeaways

- Being a lot more comfortable using JavaScript. Being creative in using what I’ve already learnt and applying different methods and techniques to make each section work. Seeing how different methods and techniques can be used to create different functions and features.
- As my first experience of a project of this type, it helped to me anticipate ahead of time any possible challenges, time management and project management issues for future projects. 

### Future Improvements

- Include a high score count.
- Include a cancel button on the custom form; when I tried it, if the player pressed cancel, the game would no longer work as it should until a new difficulty is picked. I ran out of time to fix this. 
- Responsiveness for smaller screens.
- Touch screen/mobile friendliness. 
- Make the windows moveable and the close/minimise icons clickable! I often find myself trying to click these out of habit. 



