import { useState } from "react";


function Circle({ className, style, onCircleClick }) {
  return (
    <button className={className} style={style} onClick={onCircleClick} />
  );
}


function Board({ history, onUserClick }) {
  const handleColors = {
    "#FFFFFF": "#008000",
    "#008000": "#ffa500",
    "#ffa500": "#ff0000",
    "#ff0000": "#FFFFFF",
  }

  function handleUserClick(circle) {
    let updatedHistory = history.slice();
    updatedHistory[circle] = handleColors[history[circle]]
    onUserClick(circle, updatedHistory);
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
    circlesBoard.push(<Circle key={index} className="circle" style={style} onCircleClick={() => handleUserClick(index)} />)
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

  function handleUserClick(circle, updatedHistory) {
    setHistory(updatedHistory);
  };

  return (
    <div className="main-block">
      <h1>PINColor</h1>
      <Board history={history} onUserClick={handleUserClick}/>
    </div>
  );
}