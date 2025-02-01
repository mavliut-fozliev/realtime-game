import React, { useEffect } from "react";
import "./Canvas.css";
import Cube from "../Entities/Cube";
import Entity from "../Entities/Entity";
import Room from "../Entities/Room";
import Context from "../Context/Context";

function createEntities(ctx: Context) {
  const room = new Room(ctx);
  const cube = new Cube(ctx, 0, 200);
  const cube2 = new Cube(ctx, -100, 200);
  const cube3 = new Cube(ctx, -200, 200);

  return [room, cube, cube2, cube3];
}

function handleEvents(entities: Entity[]) {
  const handleKeydown = (keyboardEvent: KeyboardEvent) => {
    entities.forEach((entity) => entity.handleKeydown(keyboardEvent));
  };
  window.addEventListener("keydown", handleKeydown);

  const handleKeyup = (keyboardEvent: KeyboardEvent) => {
    entities.forEach((entity) => entity.handleKeyup(keyboardEvent));
  };
  window.addEventListener("keyup", handleKeyup);
}

function updateMethods(entities: Entity[], time: number) {
  entities.forEach((entity) => entity.update(time));
}

function drawMethods(entities: Entity[]) {
  entities.forEach((entity) => entity.draw());
}

function animate(time: number, ctx: Context, entities: Entity[]) {
  ctx.clearScreen();

  updateMethods(entities, time);
  drawMethods(entities);

  requestAnimationFrame((time) => animate(time, ctx, entities));
}

function start(ctx: Context) {
  const entities = createEntities(ctx);
  handleEvents(entities);

  requestAnimationFrame((time) => animate(time, ctx, entities));
}

function resizeCanvas(ctx: Context) {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

function Canvas() {
  useEffect(() => {
    const ctx = new Context();

    resizeCanvas(ctx);
    window.addEventListener("resize", () => resizeCanvas(ctx));

    start(ctx);
  }, []);

  return <canvas id="canvas"></canvas>;
}

export default Canvas;
