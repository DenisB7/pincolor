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
      document.getElementById("message-to-user").textContent = "Choose 4 colors by clicking on circles, remember it and save!";
    } else {
      document.getElementById("message-to-user").textContent = "You are permitted to choose only 4!";
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
        <button className="reset" onClick={onUserResetClick}>reset</button>
        <button className="confirm" onClick={() => onUserConfirmClick(history)}>confirm</button>
      </div>
    </>
  );
}


export default function Pin() {
  const [history, setHistory] = useState(Array(10).fill("#FFFFFF"));

  function handleUserClickOnSave() {
    setHistory(Array(10).fill("#FFFFFF"));
    document.getElementById("message-to-user").textContent = "Great! Please enter your PINColor code and click CONFIRM button!";
  };

  function handleUserClickOnCircles(circle, updatedHistory) {
    setHistory(updatedHistory);
  };

  function handleUserClickOnReset() {
    setHistory(Array(10).fill("#FFFFFF"));
    document.getElementById("message-to-user").textContent = "Choose 4 colors by clicking on circles, remember it and save!";
  };

  function handleUserClickOnConfirm(updatedHistory) {
    setHistory(updatedHistory);
  };

  return (
    <div className="main-block">
      <h3 id="message-to-user">Choose 4 colors by clicking on circles, remember it and save!</h3>
      <div className="button-save">
        <button className="save" onClick={handleUserClickOnSave}>save</button>
      </div>
      <Board
        history={history}
        onUserCircleClick={handleUserClickOnCircles}
        onUserResetClick={handleUserClickOnReset}
        onUserConfirmClick={handleUserClickOnConfirm}
      />
    </div>
  );
}