export default class Scene {
  constructor(private ctx: CanvasRenderingContext2D) {}

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(0, 0, 50, 50);
    this.ctx.fillStyle = "blue";
    this.ctx.fill();
    this.ctx.stroke();
  }

  update() {}
}
