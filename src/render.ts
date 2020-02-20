import { Vector } from "./math"
import Grid from "./grid"
import State from "./state"

//should recieve a world model
let canvas = <HTMLCanvasElement> document.getElementById("canvas1")
let canvasSize = new Vector(canvas.clientWidth, canvas.clientHeight)
let c = canvas.getContext('2d')

export function render(state) {
    // Clear the page
    clearCanvas()

    //grid map
    drawGrid(new Vector(0, 0), new Vector(canvasSize.x, canvasSize.y), state.map)
}
export function clearCanvas() {
        // Clear the page
        c.fillStyle = "beige"
        c.fillRect(0, 0, canvasSize.x, canvasSize.y)        
}
export function drawGrid(pos: Vector, size: Vector, grid: Grid) {
    let tileSize = new Vector(size.x / grid.width, size.y / grid.height)
    grid.content.forEach((row, indexR) => {
        row.forEach((tile, indexC) => {
            //Draw Tile contents here maybe
            let currentPos = new Vector(indexC * tileSize.x, indexR * tileSize.y)
            strokeRect(currentPos, tileSize)
            if (tile.content == 1) {
                drawRect(currentPos, tileSize, "red")
            }
        })
    })
}
export function numberGrid(pos: Vector, size: Vector, grid: Grid) {
    let tileSize = new Vector(size.x / grid.width, size.y / grid.height)
    grid.content.forEach((row, indexR) => {
        row.forEach((tile, indexC) => {
            //Draw Tile contents here maybe
            let currentPos = new Vector(indexC * tileSize.x - tileSize.x / 3.3, indexR * tileSize.y)
            let currentText = indexC.toString() +", "+ indexR.toString()
            //Numbers
            drawText(currentPos, tileSize.x / 3.3, currentText)
        })
    })
}
export function drawText(pos: Vector, size: number, text: string, color: string = "black") {
    c.fillStyle = color
    c.font = size + "px Times New Roman"
    c.fillText(text, pos.x + size, pos.y + size)
}
export function drawRect(pos: Vector, size: Vector, color: string = "red") {
    c.fillStyle = color
    c.fillRect(pos.x, pos.y, size.x, size.y)
}
export function strokeRect(pos: Vector, size: Vector, color: string = "black") {
    c.strokeStyle = color
    c.strokeRect(pos.x, pos.y, size.x, size.y)
}