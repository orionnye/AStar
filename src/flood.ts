import Grid from './grid'
import { Vector } from './math'

//NEED TO REWORK TILE CLASS SO WE KNOW HOW FAR IT GOES
export class Tile {
    origin: any
    pos: Vector
    cost: number
    constructor(origin: any, pos: Vector) {
        this.origin = origin
        this.pos = pos
        this.cost = 0
    }
    addCost(cost: number) {
        this.cost += cost
    }
}


export class Flood {
    //stores travelled tiles
    cells: Vector[]
    parents: Tile[]
    start: Vector
    finish: Vector
    growIndex: number
    nope: boolean
    constructor(start: Vector, finish: Vector) {
        this.start = start
        this.finish = finish
        this.growIndex = 0
        this.cells = []
        this.parents = []
        this.cells.push(start)
        this.nope = false
    }

    get complete() {
        if (this.contains(this.finish) || this.nope) {
            return true
        }
        return false
    }
    findPathHome(child: Tile) {
        //store all parents pos
        let path : Vector[] = []
        // push current
        if (child.pos.x !== undefined) {
            path.push(child.pos)
        }
        //have tile parent or vector
        //asign to parent
        let current = child.origin
        while (current.x == undefined) {
            path.push(current.pos)
            current = current.origin
        }
        if (current.x !== undefined) {
            path.push(current)
        }
        return path
    }
    addLitter(parent: Tile, cells: Vector[]) {
        cells.forEach(cell => {
            if (!this.contains(cell)) {
                let child = new Tile(parent, cell)
                //distance eval
                let dist : number = cell.subtract(parent.pos).length
                let cost = parent.cost + dist
                child.cost = cost
                //index eval
                // let parentIndex = parent.x ?
                this.parents.push(child)
                this.cells.push(cell)
            }
        })
    }
    
    grow(map: Grid) {
        //grab cell at grow index
        if (this.growIndex < this.cells.length) {
            let focus = this.cells[this.growIndex]
            if (this.parents.length == 0) {
                //firstPush
                let origin = new Tile(focus, focus)
                let neighbors : Vector[] = map.getNeighbors(origin.pos)
                this.addLitter(origin, neighbors)
            } else if(this.parents.length > 0) {
                let origin = this.parents[this.growIndex]
                // console.log(origin)
                if (origin !== undefined) {
                    let neighbors : Vector[] = map.getNeighbors(origin.pos)
                    this.addLitter(origin, neighbors)
                    this.growIndex += 1
                } else {
                    this.nope = true
                    console.log("we got nothing chief")
                }
            }
        }
    }

    contains(pos : Vector) {
        //check through the whole array for a preexisting double
        for (let i = 0; i < this.cells.length; i++) {
            let cell = this.cells[i]
            if (pos.x == cell.x && pos.y == cell.y) {
                return true
            }
        }
        return false
    }
    finalPath() {
        //check for path containing the final tile
        let completePaths = []
        for (let i = this.parents.length - 1; i > 1; i--) {
            //check list from top back to find the finish tile faster
            let tile = this.parents[i]
            if (tile.pos.x == this.finish.x && tile.pos.y == this.finish.y) {
                //return the path containing it
                completePaths.push(this.parents[i])
            }
        }
        let winner
        let lowestCost
        completePaths.forEach(value => {
            if (lowestCost == undefined) {
                lowestCost = value.cost
                winner = value
            } else if (lowestCost > value.cost) {
                // console.log(winner)
                winner = value
            }
        })
        return winner
    }
}