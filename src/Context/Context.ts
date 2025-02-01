export default class Context {
  private ctx: CanvasRenderingContext2D;

  constructor() {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (!canvas) throw new Error("Canvas element not found");

    const context = canvas.getContext("2d");
    if (!context) throw new Error("Could not get 2D context");

    this.ctx = context;
  }

  get canvas() {
    return this.ctx.canvas;
  }

  private transformCoordinates = (x: number, y: number): [number, number] => {
    return [window.innerWidth / 2 + x, window.innerHeight / 2 + y];
  };

  moveTo(x: number, y: number) {
    this.ctx.moveTo(...this.transformCoordinates(x, y));
  }

  moveToCenter() {
    this.moveTo(0, 0);
  }

  clearRect(x: number, y: number, width: number, height: number) {
    this.ctx.clearRect(...this.transformCoordinates(x, y), width, height);
  }

  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  beginPath() {
    this.ctx.beginPath();
  }

  lineTo(x: number, y: number) {
    this.ctx.lineTo(...this.transformCoordinates(x, y));
  }

  lineToCenter() {
    this.lineTo(0, 0);
  }

  stroke(strokeStyle?: string) {
    if (strokeStyle) this.ctx.strokeStyle = strokeStyle;
    this.ctx.stroke();
  }

  fill(fillStyle?: string) {
    if (fillStyle) this.ctx.fillStyle = fillStyle;
    this.ctx.fill();
  }
}
