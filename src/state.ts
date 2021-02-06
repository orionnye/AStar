import { Vector } from "./math"
import Input from "./input"
import Grid from "./grid"
import { drawRect } from "./render"

export default class State {
    input: Input
    map: Grid
    size: Vector
    dimension: Vector
    constructor(size: Vector, dimension: Vector) {
        this.size = size
        this.dimension = dimension
        this.input = new Input()
        this.map = new Grid(size)
    }
    get cellSize() {
        let {dimension, map} = this
        return new Vector(dimension.x / map.size.x, dimension.y / map.size.y)
    }
    randomize(blockChance: number) {
        //TEMPORARY PLACEHOLDER NUMBER
        this.map.cells.forEach((row, iRow) => {
            row.forEach((col, iCol) => {
                let currentPos = new Vector(iCol, iRow)
                let isBlock = Math.random() < blockChance
                if (isBlock)
                    this.map.setCell(currentPos, this.map.wall)
            })
        })
    }
    pick(point: Vector) {
        let pickedX = Math.floor(point.x / this.cellSize.x)
        let pickedY = Math.floor(point.y / this.cellSize.y)
        return new Vector(pickedX, pickedY)
    }
    fillCell(cell: Vector, color: string = "rgba(150, 0, 150, 0.2)") {
        let { cellSize } = this
        let cellPos = new Vector(cellSize.x * cell.x, cellSize.y * cell.y)
        drawRect(cellPos, cellSize, color)
    }
}