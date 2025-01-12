import { db } from "../firebase/firebaseConfig";
import { ref, onValue, Unsubscribe, DataSnapshot, update } from "firebase/database";

export type KeyHandlers = { [key: string]: (event: KeyboardEvent) => void };

abstract class Entity {
  private unsubscribe: Unsubscribe | null = null;
  private handleKeyDown: (event: KeyboardEvent) => void;

  constructor(documentKey: string, private onSnapshot: (snapshot: DataSnapshot) => void, private keyHandlers: KeyHandlers) {
    this.handleKeyDown = this.onKeyDown.bind(this);
    this.init(documentKey);
  }

  private init(documentKey: string) {
    const documentRef = ref(db, documentKey);
    this.unsubscribe = onValue(documentRef, (snapshot) => {
      this.onSnapshot(snapshot);
    });

    window.addEventListener("keydown", this.handleKeyDown);
  }

  private onKeyDown(event: KeyboardEvent) {
    const handler = this.keyHandlers[event.key];
    if (handler) {
      handler(event);
    } else {
      console.log(`Не найден обработчик для клавиши ${event.key}`);
    }
  }

  protected updateValue(path: string, key: string, newValue: number | string) {
    const dbRef = ref(db, path);
    update(dbRef, { [key]: newValue });
  }

  destroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }

    window.removeEventListener("keydown", this.handleKeyDown);
  }
}

export default Entity;
