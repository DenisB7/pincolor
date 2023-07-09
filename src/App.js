import { useState } from "react";


function Circle({ className, onCircleClick }) {
  return (
    <button className={className} onClick={onCircleClick} />
  );
}


function Board({ history, onUserClick }) {
  const handleColors = {
    "white": "green",
    "green": "orange",
    "orange": "red",
    "red": "white",
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
    let className = `circle ${color}`;
    circlesBoard.push(<Circle key={index} className={className} onCircleClick={() => handleUserClick(index)} />)
    row++
  });

  return (
    <div className="pin">
      {board}
    </div>
  );
}


export default function Pin() {
  const [history, setHistory] = useState(Array(10).fill("white"));

  function handleUserClick(circle, updatedHistory) {
    setHistory(updatedHistory);
  };

  return (
    <div className="pin-block">
      <h1>PIN Color</h1>
      <Board history={history} onUserClick={handleUserClick}/>
    </div>
  );
}