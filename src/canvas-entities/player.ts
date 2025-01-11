import { db } from "../firebase/firebaseConfig";
import { ref, update, onValue, Unsubscribe } from "firebase/database";

class Player {
  private unsubscribe: Unsubscribe | null = null;
  private handleKeyDown: (event: KeyboardEvent) => void;

  constructor(private ctx: CanvasRenderingContext2D, private x = 0, private y = 0) {
    this.handleKeyDown = this.onKeyDown.bind(this);
    this.init();
  }

  private init() {
    const leftRef = ref(db, "left");
    this.unsubscribe = onValue(leftRef, (snapshot) => {
      this.x = snapshot.val() || 0;
    });

    window.addEventListener("keydown", this.handleKeyDown);
  }

  private updateLeftValue(newValue: number) {
    const dbRef = ref(db);
    update(dbRef, { left: newValue });
  }

  private increaseLeft() {
    const newValue = this.x + 1;
    this.updateLeftValue(newValue);
  }

  private onKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowRight") {
      this.increaseLeft();
    }
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

  destroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }

    window.removeEventListener("keydown", this.handleKeyDown);
  }
}

export default Player;
