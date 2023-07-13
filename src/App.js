import { useState } from "react";


function CircleButton({ className, style, onUserCircleClick }) {
  return (
    <button className={className} style={style} onClick={onUserCircleClick} />
  );
}


function Board({ history, onUserCircleClick }) {
  const handleColors = {
    "#FFFFFF": "#008000",
    "#008000": "#ffa500",
    "#ffa500": "#ff0000",
    "#ff0000": "#FFFFFF",
  };

  function handleUserClickOnCircle(circle) {
    let checkNumberOfEnteredColors = history.filter(color => color !== "#FFFFFF");
    let userIsChangingTheSameCircle = history.filter((color, index) => color !== "#FFFFFF" && index === circle);
    if (checkNumberOfEnteredColors.length !== 4 || userIsChangingTheSameCircle.length === 1) {
      let updatedHistory = history.slice();
      updatedHistory[circle] = handleColors[history[circle]];
      onUserCircleClick(updatedHistory);
      if (document.getElementById("message-to-user").textContent !== "Great! Please enter your PINColor code and click CONFIRM button!") {
        document.getElementById("message-to-user").textContent = "Choose 4 colors by clicking on circles, remember it and SAVE!";
      }
    } else if (document.getElementById("message-to-user").textContent !== "Great! Please enter your PINColor code and click CONFIRM button!") {
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
    circlesBoard.push(<CircleButton key={index} className="circle" style={style} onUserCircleClick={() => handleUserClickOnCircle(index)} />)
    row++
  });

  return (
    <div className="pin-block">
      {board}
    </div>
  );
}


export default function Pin() {
  const [history, setHistory] = useState(Array(10).fill("#FFFFFF"));
  const [savedPinColor, setSavedPinColor] = useState([]);

  function handleUserClickOnCircle(updatedHistory) {
    setHistory(updatedHistory);
  };

  function handleUserClickOnSaveButton() {
    let chosenColors = history.filter(color => color !== "#FFFFFF");
    if (chosenColors.length === 4 && savedPinColor.length === 0) {
      setSavedPinColor(history);
      setHistory(Array(10).fill("#FFFFFF"));
      document.getElementById("message-to-user").textContent = "Great! Please enter your PINColor code and click CONFIRM button!";
    } else if (savedPinColor.length > 0 && document.getElementById("message-to-user").textContent !== "Congratulations! Correct!") {
      document.getElementById("message-to-user").textContent = "You already SAVEd your pincolor! Try to recall it and click on CONFIRM or RESET everything!";
    }
  };

  function handleUserClickOnResetButton() {
    setHistory(Array(10).fill("#FFFFFF"));
    setSavedPinColor([]);
    document.getElementById("message-to-user").textContent = "Choose 4 colors by clicking on circles, remember it and SAVE!";
  };

  function handleUserClickOnConfirmButton() {
    let savedColors = savedPinColor.filter(color => color !== "#FFFFFF");
    let chosenColors = history.filter(color => color !== "#FFFFFF");
    if (chosenColors.length === 4 && savedColors.length === 4) {
      let colorsAreEqualAndOnTheSamePlaces = history.every((color, index) => color === savedPinColor[index]);
      if (colorsAreEqualAndOnTheSamePlaces) {
        document.getElementById("message-to-user").textContent = "Congratulations! Correct!";
      } else {
        document.getElementById("message-to-user").textContent = "Incorrect! Click on RESET and try again!";
      }
    }
  };

  return (
    <div className="main-block">
      <h3 id="message-to-user">Choose 4 colors by clicking on circles, remember it and SAVE!</h3>
      <div className="button-save">
        <button className="save" onClick={handleUserClickOnSaveButton}>save</button>
      </div>
      <Board
        history={history}
        onUserCircleClick={handleUserClickOnCircle}
      />
      <div className="buttons">
        <ResetButton handleUserClickOnResetButton={handleUserClickOnResetButton}/>
        <ConfirmButton handleUserClickOnConfirmButton={handleUserClickOnConfirmButton}/>
      </div>
    </div>
  );
}


function ResetButton({ handleUserClickOnResetButton }) {
  return <button className="reset" onClick={handleUserClickOnResetButton}>reset</button>
}


function ConfirmButton({ handleUserClickOnConfirmButton }) {
  return <button className="confirm" onClick={handleUserClickOnConfirmButton}>confirm</button>
}