import Grid from "./grid"
import { Vector } from "./math"
import Player from "./player"
import Input from "./input"

export default class State {
    map: Grid
    input: Input
    constructor(width: number, height: number) {
        this.map = new Grid(width, height)
        this.input = new Input()
    }
}