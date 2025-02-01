import Context from "../Context/Context";

export default abstract class Entity {
  constructor(protected ctx: Context) {}

  handleKeydown(keyboardEvent: KeyboardEvent) {}
  handleKeyup(keyboardEvent: KeyboardEvent) {}

  update(time: number) {}
  draw() {}
}
