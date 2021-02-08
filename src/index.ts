import State from './state'
import { Vector } from './math'
import { clearCanvas, drawRect, drawLines } from './render'
import Grid from './grid'
import { Tile, Flood } from './flood'

//Updating verification
console.log("Looking for an honest man")
//Page State
let canvas = <HTMLCanvasElement>document.getElementById("canvas1")
let canvasSize = new Vector(canvas.clientWidth, canvas.clientHeight)

let state = new State(new Vector(10, 10), canvasSize)
let { map, input, cellSize } = state
input.watchCursor()
input.watchMouse()
input.watchKeys()
input.watchCursor()

//map state(should be passed in)
let randomTerrain = 1
if (randomTerrain) {
    //random map design
    state.randomize(0.3)
} else {
    //fixed map design
    map.setCell(new Vector(1, 0), 1)
    map.setCell(new Vector(0, 1), 1)
    map.setCell(new Vector(2, 1), 1)
}

//path state
//should be comprised of backword facing cells(knowing only their origin and not knowing their children)
let start = new Vector(2, 2)
let finish = new Vector(2, 1)
let flood = new Flood(start, finish)

// let test : Vector[] = []
// let testStart = new Vector(1, 1)
// test.push(testStart)
// test.push(new Vector(1, 1))
//State Change
function update() {
    //onclick path movement
    if (input.mouse.get(0)) {
        console.log("left click!")
        //check cursor is valid pos
        //calculate pointers pos in map
        let cell = state.pick(input.cursor)
        if (state.map.containsCell(cell)) {
            if (map.cells[cell.y][cell.x] == 0) {
                flood.start = cell
            }
        }
        // flood = new Flood(start, finish)
    }
    // if (input.mouse.get(2)) {
    //     console.log("right click!")
    //     //check cursor is valid pos
    //     //calculate pointers pos in map
    //     let cell = state.pick(input.cursor)
    //     if (state.map.containsCell(cell)) {
    //         if (map.cells[cell.y][cell.x] == 0) {
    //             finish = cell
    //         }
    //     }
    //     flood = new Flood(start, finish)
    // }

    if (input.keys.get("Enter")) {
        //flood adds neighbors for one cell
        if (!flood.complete) {
            flood.grow(map)
        } else {
            if (flood.contains(flood.finish)) {
                let path = flood.findPathHome(flood.finalPath())
                // console.log("path: ", path)
            }
            console.log("complete!")
        }
    }

    let cell = state.pick(input.cursor)
    if (state.map.containsCell(cell)) {
        if (map.cells[cell.y][cell.x] == 0) {
            flood.finish = cell
        }
    }
    if (!flood.complete) {
        flood.grow(map)
    }
}

//State Display
function render() {
    clearCanvas()
    map.render(canvasSize)

    //draw Flood
    for (let tile of flood.tiles)
        state.fillCell(tile.pos, "rgba(100, 0, 0, 0.4)")

    //draw path start
    let startPos = flood.start.multiplyVec(cellSize)
    drawRect(startPos, cellSize, "red")

    let finishPos = flood.finish.multiplyVec(cellSize)
    drawRect(finishPos, cellSize, "blue")

    //Final Path Render
    // console.log(flood.complete)
    if (flood.complete) {
        // let path = flood.findPathHome(flood.finalPath())
        // console.log("path: ", path)
        drawLines(flood.findPathHome(flood.finalPath()), map.getcellSize(canvasSize));
    }

    //draw path start
    // let testStartPos = testStart.multiplyVec(cellSize)
    // drawRect(testStartPos, cellSize, "red")
}
//State Reload
function reload() {
    update()
    render()
    window.requestAnimationFrame(reload)
}
reload()