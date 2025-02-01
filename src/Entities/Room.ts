import Context from "../Context/Context";
import { lowerLeftCorner, lowerRightCorner, upperLeftCorner, upperRightCorner } from "../util/helpers";
import Entity from "./Entity";

export default class Room extends Entity {
  constructor(protected ctx: Context) {
    super(ctx);
  }

  draw() {
    const hide = true;
    if (hide) return;

    this.ctx.beginPath();
    this.ctx.moveTo(...upperLeftCorner());
    this.ctx.lineTo(...lowerRightCorner());
    this.ctx.moveTo(...upperRightCorner());
    this.ctx.lineTo(...lowerLeftCorner());

    this.ctx.stroke("blue");
  }
}
