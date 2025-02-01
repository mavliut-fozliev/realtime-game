import Context from "../Context/Context";
import Entity from "./Entity";

export default class Cube extends Entity {
  constructor(protected ctx: Context) {
    super(ctx);
  }

  // entity center position
  private x = 100;
  private y = 200;

  private width = 100;
  private speed = 2;

  private clickedButtons: string[] = [];

  private multiplier = 0.8;
  private multiplier2 = 1;

  private inJump = false;
  private jumpHeight = 100;
  private jumpSpeed = 10;
  private jumpStartY: number | null = null;

  handleKeydown(keyboardEvent: KeyboardEvent) {
    if (this.clickedButtons.includes(keyboardEvent.key)) return;
    this.clickedButtons = [...this.clickedButtons, keyboardEvent.key];
  }

  handleKeyup(keyboardEvent: KeyboardEvent) {
    this.clickedButtons = this.clickedButtons.filter((b) => b !== keyboardEvent.key);
  }

  update(time: number) {
    const buttonActions: { [key: string]: Function } = {
      "d": () => (this.x = this.x - this.speed),
      "a": () => (this.x = this.x + this.speed),
      // "Shift": () => (this.y = this.y + this.speed),
      // "Control": () => (this.y = this.y - this.speed),
      "w": () => (this.multiplier2 = this.multiplier2 + this.multiplier2 * 0.003),
      "s": () => (this.multiplier2 = this.multiplier2 - this.multiplier2 * 0.003),
      " ": () => (this.inJump = true),
    };

    this.clickedButtons.forEach((b) => buttonActions[b]?.());

    if (this.inJump) {
      this.jumpStartY = typeof this.jumpStartY == "number" ? this.jumpStartY : this.y;
      const maxY = this.jumpStartY + this.jumpHeight;

      this.y = this.y + this.jumpSpeed;

      if (this.y >= maxY) {
        this.jumpSpeed = -this.jumpSpeed;
      }

      if (this.y <= this.jumpStartY) {
        this.inJump = false;
        this.jumpStartY = null;
        this.jumpSpeed = -this.jumpSpeed;
      }
    }
  }

  draw() {
    const halfWidth = this.width / 2;
    const startX = this.x - halfWidth;
    const endX = this.x + halfWidth;
    const startY = this.y - halfWidth;
    const endY = this.y + halfWidth;

    const lu = [startX * this.multiplier2, startY * this.multiplier2];
    const ru = [endX * this.multiplier2, startY * this.multiplier2];
    const rd = [endX * this.multiplier2, endY * this.multiplier2];
    const ld = [startX * this.multiplier2, endY * this.multiplier2];

    this.ctx.beginPath();
    this.ctx.moveTo(lu[0], lu[1]);
    this.ctx.lineTo(ru[0], ru[1]);
    this.ctx.lineTo(rd[0], rd[1]);
    this.ctx.lineTo(ld[0], ld[1]);
    this.ctx.lineTo(lu[0], lu[1]);

    this.ctx.fill("green");
    this.ctx.stroke("black");

    //back

    const blu = [lu[0] * this.multiplier, lu[1] * this.multiplier];
    const bru = [ru[0] * this.multiplier, ru[1] * this.multiplier];
    const brd = [rd[0] * this.multiplier, rd[1] * this.multiplier];
    const bld = [ld[0] * this.multiplier, ld[1] * this.multiplier];

    //draw sides instead of back and lines, so back will be created automatically
    /*
    this.ctx.beginPath();
    this.ctx.moveTo(blu[0], blu[1]);
    this.ctx.lineTo(bru[0], bru[1]);
    this.ctx.lineTo(brd[0], brd[1]);
    this.ctx.lineTo(bld[0], bld[1]);
    this.ctx.lineTo(blu[0], blu[1]);

    this.ctx.stroke("black");

    //lines
    const hideExcess = true;

    this.ctx.beginPath();
    this.ctx.moveTo(lu[0], lu[1]);
    hideExcess ? this.ctx.lineTo(blu[0], blu[1]) : this.ctx.lineToCenter();
    this.ctx.moveTo(ru[0], ru[1]);
    hideExcess ? this.ctx.lineTo(bru[0], bru[1]) : this.ctx.lineToCenter();
    this.ctx.moveTo(ld[0], ld[1]);
    hideExcess ? this.ctx.lineTo(bld[0], bld[1]) : this.ctx.lineToCenter();
    this.ctx.moveTo(rd[0], rd[1]);
    hideExcess ? this.ctx.lineTo(brd[0], brd[1]) : this.ctx.lineToCenter();

    this.ctx.stroke(hideExcess ? "black" : "red");
    */

    //sides
    this.ctx.beginPath();
    this.ctx.moveTo(lu[0], lu[1]);
    this.ctx.lineTo(blu[0], blu[1]);
    this.ctx.lineTo(bld[0], bld[1]);
    this.ctx.lineTo(ld[0], ld[1]);
    this.ctx.lineTo(lu[0], lu[1]);

    if (startX > 0) {
      this.ctx.fill("green");
      this.ctx.stroke("black");
    }

    this.ctx.beginPath();
    this.ctx.moveTo(ru[0], ru[1]);
    this.ctx.lineTo(bru[0], bru[1]);
    this.ctx.lineTo(brd[0], brd[1]);
    this.ctx.lineTo(rd[0], rd[1]);
    this.ctx.lineTo(ru[0], ru[1]);

    if (endX < 0) {
      this.ctx.fill("green");
      this.ctx.stroke("black");
    }

    this.ctx.beginPath();
    this.ctx.moveTo(lu[0], lu[1]);
    this.ctx.lineTo(blu[0], blu[1]);
    this.ctx.lineTo(bru[0], bru[1]);
    this.ctx.lineTo(ru[0], ru[1]);
    this.ctx.lineTo(lu[0], lu[1]);

    if (startY > 0) {
      this.ctx.fill("green");
      this.ctx.stroke("black");
    }

    this.ctx.beginPath();
    this.ctx.moveTo(ld[0], ld[1]);
    this.ctx.lineTo(bld[0], bld[1]);
    this.ctx.lineTo(brd[0], brd[1]);
    this.ctx.lineTo(rd[0], rd[1]);
    this.ctx.lineTo(ld[0], ld[1]);

    if (endY < 0) {
      this.ctx.fill("green");
      this.ctx.stroke("black");
    }
  }
}
