import State from './src/state'
import { Vector } from './src/math'
import { clearCanvas, drawGrid, numberGrid } from './src/render'
import Player from './src/player'

//Updating verification
console.log("Looking for an honest man")
//Page stats
let canvas = <HTMLCanvasElement> document.getElementById("canvas1")
let canvasSize = new Vector(canvas.clientWidth, canvas.clientHeight)

//STATE DECLARATION
let state = new State(10, 10)
let playerMain = new Player(new Vector(0, 0), new Vector(1, 1))
let playerSide = new Player(new Vector(0, 0), new Vector(1, 1))
playerMain.watchKeys()
// playerSide.watchKeys()

//random terrain switch
let randomTerrain = 1
if (randomTerrain) {
  let blockChance = 0.3
  //TEMPORARY BLOCK HOLDER!
  let REDBLOCK = 1
  state.map.content.forEach((row, IRow) => {
    row.forEach((tile, ICol) => {
      let currentPos = new Vector(ICol, IRow)
      let isBlock = Math.random() < blockChance
      if (isBlock)
        state.map.set(currentPos, REDBLOCK)
    })
  })
} else {
  //custom map
  state.map.setBlock(new Vector(2, 2), new Vector(4, 4), 1)
}


//STATE CHANGE
function update() {
  //CREATE INPUT NEXT/
  //input is stored on a player
  if (playerMain.keys.get("Enter")) {
    playerMain.stopWatch()
  }
  
}
//STATE DISPLAY
function render() {
  clearCanvas()
  drawGrid(new Vector(0, 0), new Vector(canvasSize.x, canvasSize.y), state.map)
  numberGrid(new Vector(0, 0), new Vector(canvasSize.x, canvasSize.y), state.map)
}
//STATE RELOAD
function reload() {
  update()
  render()
  window.requestAnimationFrame(reload)
}
reload()
