import { Vector } from "./math";
import {drawRect, strokeRect, drawText } from "./render";

//map storage
export default class Grid {
    size: Vector
    empty: 0
    wall: 1
    cells: Number[][]
    constructor( size: Vector ) { 
        this.size = size
        this.empty = 0
        this.wall = 1
        this.cells = []
        for (let r = 0; r < size.y; r++) {
            this.cells.push([])
            for (let c = 0; c < size.x; c++) {
                this.cells[r].push(this.empty)
            }
        }
    }
    //Simple data access
    get height() {
        return this.size.y
    }
    get width() {
        return this.size.x
    }
    getcellSize(dimensions) {
        let { size } = this
        return new Vector(dimensions.x / size.x, dimensions.y / size.y)
    }
    containsCell(point: Vector) {
        if (point.x >= 0 && point.x < this.width) {
            if (point.y >= 0 && point.y < this.height) {
                return true
            }
            return false
        }
        return false
    }
    //Update Functions
    setCell(cell: Vector, value: number) {
        //Checks Entry Is Valid
        if (cell.x < this.width && cell.x >= 0 ) {
            if (cell.y < this.height && cell.y >= 0) {
                this.cells[cell.y][cell.x] = value
            } else {
                console.error("Invalid setCell("+ cell, value +") call on:" + this)
            }
        } else {
            console.error("Invalid setCell("+ cell, value +") call on:" + this)
        }
    }
    getNeighbors(cell: Vector, value: number = 0) {
        //check if cotained
        if (this.containsCell(cell)) {
            let {x, y} = cell
            let neighbors : Vector[] = []
            //check if on end of array then get nearby empty value
            //left three
            if (x > 0) {
                //up
                // if (y > 0 && this.cells[y - 1][x - 1] == value)
                //     neighbors.push(new Vector(x - 1, y - 1))
                //center
                if (this.cells[y ][x - 1] == value)
                    neighbors.push(new Vector(x - 1, y))
                //down
                // if (y < this.height - 1 && this.cells[y + 1][x - 1] == value)
                //     neighbors.push(new Vector(x - 1, y + 1))
            }
            //right three
            if (x < this.width - 1) {
                //up
                // if (y > 0 && this.cells[y - 1][x + 1] == value)
                //     neighbors.push(new Vector(x + 1, y - 1))
                //center
                if (this.cells[y][x + 1] == value)
                    neighbors.push(new Vector(x + 1, y))
                //down
                // if (y < this.height - 1 && this.cells[y + 1][x + 1] == value)
                //     neighbors.push(new Vector(x + 1, y + 1))
            }
            //center two
            //up
            if (y > 0 && this.cells[y - 1][x] == value)
                neighbors.push(new Vector(x, y - 1))
            //down
            if (y < this.height - 1 && this.cells[y + 1][x] == value)
                neighbors.push(new Vector(x, y + 1))
            return neighbors
        } else {
            console.error("tried to get a neighbor on a non existant cell")
        }
    }
    //Display Functions
    render(dimensions: Vector, numbered: boolean = false) {
        let {size, empty, wall, cells} = this
        let cellSize = new Vector(dimensions.x / size.x, dimensions.y / size.y)
        cells.forEach( (r, row) => {
            r.forEach( (c, column) => {
                let cellPos = new Vector(cellSize.x * column, cellSize.y * row)
                strokeRect(cellPos, cellSize, "black")

                //occupied colors
                if (c == wall) {
                    drawRect(cellPos, cellSize, "grey")
                }
                if (numbered) {
                    drawText(cellPos, cellSize.x / 4, `${column}, ${row}`)
                }
            })
        })
    }
}
