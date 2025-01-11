import React from "react";
import "./Player.css";

function Player({ left }: { left: number }) {
  return <div className="box" style={{ marginLeft: `${left}px` }}></div>;
}

export default Player;
