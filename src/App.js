import { useState } from "react";


function CircleButton({ className, style, onUserCircleClick }) {
  return (
    <button className={className} style={style} onClick={onUserCircleClick} />
  );
}


function Board({ history, onUserCircleClick, savedPinColor, confirmed }) {
  /*
    Title: Board with circles and to handle user interaction with circles and colors in them
    About the code below:
    It creates Board with circles which are buttons, when user click on any circle, it change colors.
    It has limit, user can click only on 4 circles.
    For example:
    Each circle has default color - "white".
    By clicking on circles, circle change colors.
    User chose 4 colors ["red", "orange", "green", "green"].
    User can change colors of that circles by clicking on them again.
    User is trying to click on additional circle, it will not work.
    However user can return color of one of the circles to default white color, then user will have 3 chosen colors ["red", "orange", "green"]
    and then click any other circle.
  */

  const handleColors = {
    "#FFFFFF": "#008000",
    "#008000": "#ffa500",
    "#ffa500": "#ff0000",
    "#ff0000": "#FFFFFF",
  };

  function handleUserClickOnCircle(circle, savedPinColor, confirmed) {
    let checkNumberOfEnteredColors = history.filter(color => color !== "#FFFFFF");
    let userIsChangingTheSameCircle = history.filter((color, index) => color !== "#FFFFFF" && index === circle);
    if (checkNumberOfEnteredColors.length !== 4 || userIsChangingTheSameCircle.length === 1) {
      let updatedHistory = history.slice();
      updatedHistory[circle] = handleColors[history[circle]];
      onUserCircleClick(updatedHistory);
      if (typeof savedPinColor === "undefined") {
        document.getElementById("message-to-user").textContent = "Choose 4 colors by clicking on circles, remember it and SAVE!";
      }
    } else if (typeof savedPinColor !== "undefined" && confirmed === false) {
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
    circlesBoard.push(<CircleButton key={index} className="circle" style={style} onUserCircleClick={() => handleUserClickOnCircle(index, savedPinColor, confirmed)} />)
    row++
  });

  return (
    <div className="pin-block">
      {board}
    </div>
  );
}


export default function Pin() {
  /*
    Title: rendering Board and buttons out of the Board
    About the code below:
    It renders Board and buttons (RESET, SAVE, CONFIRM) and mainly handle interaction of Board with buttons which are out of the Board
    For example:
    - User can click on SAVE button and will save chosen circles and colors
    - Now user is able to check his memory and click on circles again, once he chose circles and colors user click on CONFIRM button
    - If he chose it correctly user won, if not, he need to click on RESET button
    - Anyway, after correct or not correct answer user should click on RESET button
    - RESET button will reset all colors to default - "white" color
  */

  const [history, setHistory] = useState(Array(10).fill("#FFFFFF"));
  const [savedPinColor, setSavedPinColor] = useState([]);
  const [confirmed, setConfirmed] = useState(false);

  function handleUserClickOnCircle(updatedHistory) {
    setHistory(updatedHistory);
  };

  function handleUserClickOnSaveButton() {
    let chosenColors = history.filter(color => color !== "#FFFFFF");
    if (chosenColors.length === 4 && savedPinColor.length === 0) {
      setSavedPinColor(history);
      setHistory(Array(10).fill("#FFFFFF"));
      document.getElementById("message-to-user").textContent = "Great! Please enter your PINColor code and click CONFIRM button!";
      let pinToShow = chosenColors.join("");
      document.getElementById("show-pin-message").textContent = `your pin: ${pinToShow}`;
    } else if (savedPinColor.length > 0 && confirmed === false) {
      document.getElementById("message-to-user").textContent = "You already SAVEd your pincolor! Try to recall it and click on CONFIRM or RESET everything!";
    }
  };

  function handleUserClickOnResetButton() {
    setHistory(Array(10).fill("#FFFFFF"));
    setSavedPinColor([]);
    document.getElementById("message-to-user").textContent = "Choose 4 colors by clicking on circles, remember it and SAVE!";
    document.getElementById("show-pin-message").textContent = "your pin you will see here";
  };

  function handleUserClickOnConfirmButton() {
    let savedColors = savedPinColor.filter(color => color !== "#FFFFFF");
    let chosenColors = history.filter(color => color !== "#FFFFFF");
    if (chosenColors.length === 4 && savedColors.length === 4) {
      let colorsAreEqualAndOnTheSamePlaces = history.every((color, index) => color === savedPinColor[index]);
      if (colorsAreEqualAndOnTheSamePlaces) {
        document.getElementById("message-to-user").textContent = "Congratulations! Correct! Now, you can RESET it!";
      } else {
        document.getElementById("message-to-user").textContent = "Incorrect! Click on RESET and start from the beginning!";
      }
      setConfirmed(true);
    }
  };

  return (
    <div className="main-block">
      <h3 id="message-to-user">Choose 4 colors by clicking on circles, remember it and SAVE!</h3>
      <div className="button-save">
        <SaveButton handleUserClickOnSaveButton={handleUserClickOnSaveButton}/>
      </div>
      <Board
        history={history}
        onUserCircleClick={handleUserClickOnCircle}
        savedPinColor={savedPinColor}
        confirmed={confirmed}
      />
      <div className="buttons">
        <ResetButton handleUserClickOnResetButton={handleUserClickOnResetButton}/>
        <ConfirmButton handleUserClickOnConfirmButton={handleUserClickOnConfirmButton}/>
      </div>
      <p id="show-pin-message">your pin you will see here</p>
    </div>
  );
}


function SaveButton({ handleUserClickOnSaveButton }) {
  return <button className="save" onClick={handleUserClickOnSaveButton}>save</button>
}


function ResetButton({ handleUserClickOnResetButton }) {
  return <button className="reset" onClick={handleUserClickOnResetButton}>reset</button>
}


function ConfirmButton({ handleUserClickOnConfirmButton }) {
  return <button className="confirm" onClick={handleUserClickOnConfirmButton}>confirm</button>
}