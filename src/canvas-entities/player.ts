import { DataSnapshot } from "firebase/database";
import Entity from "./Entity";

class Player extends Entity {
  private currentX: number;
  private currentY: number;

  constructor(private ctx: CanvasRenderingContext2D, private x = 0, private y = 0) {
    super(
      "player",
      (snapshot: DataSnapshot) => {
        const playerData = snapshot.val();

        if (playerData.position.x !== undefined) {
          this.x = playerData.position.x;
        }
        if (playerData.position.y !== undefined) {
          this.y = playerData.position.y;
        }
      },
      {
        "ArrowRight": () => this.move("x", "+"),
        "ArrowDown": () => this.move("y", "+"),
        "ArrowLeft": () => this.move("x", "-"),
        "ArrowUp": () => this.move("y", "-"),
      }
    );

    this.currentX = this.x;
    this.currentY = this.y;
  }

  private move(axis: "x" | "y", direction: "+" | "-") {
    const delta = direction === "+" ? 1 : -1;
    this[axis] += delta;

    this.updateValue("player/position", axis, this[axis]);
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, 50, 50);
    this.ctx.fillStyle = "blue";
    this.ctx.fill();
    this.ctx.stroke();
  }

  update() {
    if (this.x > this.ctx.canvas.width) this.x = 0;
  }
}

export default Player;
