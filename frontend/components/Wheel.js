import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import * as actionCreators from "../state/action-creators";
import { moveClockwise, moveCounterClockwise } from "../state/action-creators";

export function Wheel() {
  const dispatch = useDispatch();
  const wheelState = useSelector(state => state.wheel);
  const cogs = document.getElementsByClassName("cog");


  const handleCounterClockwise = () => {
    dispatch(moveCounterClockwise());
    changeToActive();
  };
  
  const handleClockwise = () => {
    dispatch(moveClockwise());
    changeToActive();
  };
  
 

  const changeToActive = (index) => {
    for (let i = 0; i < cogs.length; i++){
      if(i === index){
          cogs[index].classList.add("active");
      } else {
        cogs[i].classList.remove("active");
      }
    }
  }


  return (
    <div id="wrapper">
      <div id="wheel">
        <div data-id="0" className={`cog ${wheelState === 0 ? "active": ""}`} style={{ "--i": 0 }}>
          {wheelState === 0 ? "B": ""}
        </div>
        <div data-id="1" className={`cog ${wheelState === 1 ? "active": ""}`} style={{ "--i": 1 }}>
        {wheelState === 1 ? "B": ""}
        </div>
        <div data-id="2" className={`cog ${wheelState === 2 ? "active": ""}`} style={{ "--i": 2 }}>
        {wheelState === 2 ? "B": ""}
        </div>
        <div data-id="3" className={`cog ${wheelState === 3 ? "active": ""}`} style={{ "--i": 3 }}>
        {wheelState === 3 ? "B": ""}
        </div>
        <div data-id="4"className={`cog ${wheelState === 4 ? "active": ""}`} style={{ "--i": 4 }}>
        {wheelState === 4 ? "B": ""}
        </div>
        <div data-id="5" className={`cog ${wheelState === 5 ? "active": ""}`} style={{ "--i": 5 }}>
        {wheelState === 5 ? "B": ""}
        </div>
        {/* --i is a custom CSS property, no need to touch that nor the style object */}
     
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={handleCounterClockwise}>
          Counter clockwise
        </button>
        <button id="clockwiseBtn" onClick={handleClockwise}>
          Clockwise
        </button>
      </div>
    </div>
  );
}

export default connect((st) => st, actionCreators)(Wheel);
