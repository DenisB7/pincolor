import { useState } from "react";


function Circle({ className, style, onUserCircleClick }) {
  return (
    <button className={className} style={style} onClick={onUserCircleClick} />
  );
}


function Board({ history, onUserCircleClick, onUserResetClick, onUserConfirmClick }) {
  const handleColors = {
    "#FFFFFF": "#008000",
    "#008000": "#ffa500",
    "#ffa500": "#ff0000",
    "#ff0000": "#FFFFFF",
  };

  function handleUserClickOnCircles(circle) {
    let checkNumberOfEnteredColors = history.filter(color => color !== "#FFFFFF");
    let userIsChangingTheSameCircle = history.filter((color, index) => color !== "#FFFFFF" && index === circle);
    if (checkNumberOfEnteredColors.length !== 4 || userIsChangingTheSameCircle.length === 1) {
      let updatedHistory = history.slice();
      updatedHistory[circle] = handleColors[history[circle]];
      onUserCircleClick(circle, updatedHistory);
      document.getElementById("text-for-user").textContent = "Choose 4 colors by clicking on circles";
    } else {
      document.getElementById("text-for-user").textContent = "You are permitted to choose only 4!";
    }
  };

  let row = 0;
  let circlesBoard = [];
  let board = [];
  history.forEach((color, index) => {
    if (row === 3) {
      board.push(
        <div key={index} className="row">
          {circlesBoard.map(circle => circle)}
        </div>
      )
      row = 0;
      circlesBoard.length = 0;
    }
    let style = {backgroundColor: color};
    circlesBoard.push(<Circle key={index} className="circle" style={style} onUserCircleClick={() => handleUserClickOnCircles(index)} />)
    row++
  });

  return (
    <>
      <div className="pin-block">
        {board}
      </div>
      <div className="buttons">
        <button className="reset" onClick={() => onUserResetClick()}>reset</button>
        <button className="confirm" onClick={() => onUserConfirmClick(history)}>confirm</button>
      </div>
    </>
  );
}


export default function Pin() {
  const [history, setHistory] = useState(Array(10).fill("#FFFFFF"));

  function handleUserClickOnCircles(circle, updatedHistory) {
    setHistory(updatedHistory);
  };

  function handleUserClickOnReset() {
    setHistory(Array(10).fill("#FFFFFF"));
    document.getElementById("text-for-user").textContent = "Choose 4 colors by clicking on circles";
  };

  function handleUserClickOnConfirm(updatedHistory) {
    setHistory(updatedHistory);
  };

  return (
    <div className="main-block">
      <h3 id="text-for-user">Choose 4 colors by clicking on circles</h3>
      <Board
        history={history}
        onUserCircleClick={handleUserClickOnCircles}
        onUserResetClick={handleUserClickOnReset}
        onUserConfirmClick={handleUserClickOnConfirm}
      />
    </div>
  );
}