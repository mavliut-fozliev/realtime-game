import React, { useEffect, useRef, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { ref, update, onValue, DatabaseReference, get } from "firebase/database";
import Player from "../Player/Player";
import "./App.css";
import Canvas from "../Canvas/Canvas";

function App() {
  const leftRef = useRef<DatabaseReference | null>(null);
  const [left, setLeft] = useState<number>(0);
  const leftValueRef = useRef(left);

  const updateLeftValue = (newValue: number) => {
    const dbRef = ref(db);
    update(dbRef, { left: newValue });
  };

  const increaseLeft = () => {
    const newValue = leftValueRef.current + 1;
    updateLeftValue(newValue);
  };

  useEffect(() => {
    leftValueRef.current = left;
  }, [left]);

  useEffect(() => {
    leftRef.current = ref(db, "left");
    if (!leftRef.current) return;

    const unsubscribe = onValue(leftRef.current, (snapshot) => {
      const leftValue = snapshot.val();
      setLeft(leftValue);
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      const isRight = event.key == "ArrowRight";
      if (!isRight) return;
      increaseLeft();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      unsubscribe();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="App">
      {/* <div className="road">
        <Player left={left} />
      </div>
      <button onClick={increaseLeft}>Add</button>
      <div>leftValue: {left}</div> */}
      <Canvas />
    </div>
  );
}

export default App;
