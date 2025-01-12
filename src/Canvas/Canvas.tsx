import React, { useEffect } from "react";
import "./Canvas.css";
import Player from "../canvas-entities/Player";

function draw(ctx: CanvasRenderingContext2D) {
  const player = new Player(ctx);

  function animate() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // update
    player.update();

    // draw
    player.draw();

    requestAnimationFrame(animate);
  }

  animate();
}

function resizeCanvas(ctx: CanvasRenderingContext2D) {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

function Canvas() {
  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    resizeCanvas(ctx);
    window.addEventListener("resize", () => resizeCanvas(ctx));

    draw(ctx);
  }, []);

  return <canvas id="canvas"></canvas>;
}

export default Canvas;
