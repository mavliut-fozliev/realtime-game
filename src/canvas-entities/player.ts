import { DataSnapshot } from "firebase/database";
import Entity from "./Entity";

class Player extends Entity {
  private keyState: { [key: string]: boolean } = {};
  private movement: { x: number; y: number } = { x: 0, y: 0 };

  constructor(private ctx: CanvasRenderingContext2D, private x = 0, private y = 0) {
    const documentKey = "player";

    const onSnapshot = (snapshot: DataSnapshot) => {
      const playerData = snapshot.val();
      if (playerData && playerData.position) {
        this.x = playerData.position.x || this.x;
        this.y = playerData.position.y || this.y;
      }
    };

    const keyHandlers = {
      "ArrowRight": () => this.move("x", "+"),
      "ArrowLeft": () => this.move("x", "-"),
      "ArrowUp": () => this.move("y", "-"),
      "ArrowDown": () => this.move("y", "+"),
    };

    super(documentKey, onSnapshot, keyHandlers);

    this.movement = { x: this.x, y: this.y };

    window.addEventListener("keydown", (event: KeyboardEvent) => {
      this.keyState[event.key] = true;
      this.updateMovement();
    });

    window.addEventListener("keyup", (event: KeyboardEvent) => {
      this.keyState[event.key] = false;
      this.updateMovement();
    });
  }

  private move(axis: "x" | "y", direction: "+" | "-") {
    const delta = direction === "+" ? 1 : -1;
    this.movement[axis] += delta;
    this.updateValue("player/position", axis, this.movement[axis]);
  }

  private updateMovement() {
    if (this.keyState["ArrowRight"]) this.move("x", "+");
    if (this.keyState["ArrowLeft"]) this.move("x", "-");
    if (this.keyState["ArrowUp"]) this.move("y", "-");
    if (this.keyState["ArrowDown"]) this.move("y", "+");
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
