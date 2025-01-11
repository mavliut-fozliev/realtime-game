import React, { useEffect, useState } from "react";
import "./Canvas.css";

function Canvas() {
  function draw(ctx: CanvasRenderingContext2D) {
    ctx.moveTo(0, 0);
    ctx.lineTo(100, 0);
    ctx.lineTo(100, 100);
    ctx.lineTo(0, 100);
    ctx.lineTo(0, 0);
    ctx.stroke();
  }

  function resizeCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw(ctx);
  }

  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    resizeCanvas(canvas, ctx);
    window.addEventListener("resize", () => resizeCanvas(canvas, ctx));
  }, []);

  return <canvas id="canvas"></canvas>;
}

export default Canvas;
