import { Vector } from "./math";
import Input from "./input";

export default class Player extends Input{
    pos: Vector
    size: Vector
    constructor(pos, size) {
        super()
        this.pos = pos
        this.size = size
    }
}