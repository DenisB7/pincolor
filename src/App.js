import { useState } from "react";

//function Circle({ value, onCircleClick }) {
function Circle({ className, onCircleClick }) {
  // let className = "circle"
  // if (value === null) {
  //   className += " white";
  // } else {
  //   className += ` ${value}`;
  // }
  return (
    <button className={className} onClick={onCircleClick} />
  );
}

function Board({ history, onUserClick }) {
  // function handleClick(index) {
  //   if (history[index] || calculateWinner(history)[0]) {
  //     return;
  //   }
  //   const nextSquares = history.slice();
  //   if (xIsNext) {
  //     nextSquares[index] = "X";
  //   } else {
  //     nextSquares[index] = "O";
  //   }
  //   onPlay(nextSquares);
  // }
  function handleUserClick(circle) {
    //history[circle] = "green";
    let newHistory = history.slice();
    newHistory[circle] = "green"
    // onUserClick(circle, history);
    onUserClick(circle, newHistory);
  }

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
    //circlesBoard.push(<Circle key={index} value={circle[index]} onCircleClick={() => handleClick(index)} />)
    let className = `circle ${color}`
    //circlesBoard.push(<Circle key={index} className={className} onCircleClick={() => handleClick(index, currentClick)} />)
    circlesBoard.push(<Circle key={index} className={className} onCircleClick={() => handleUserClick(index)} />)
    //circlesBoard.push(<Circle key={index} className={className}/>)
    row++
  })

  return (
    <div className="pin">
      {board}
    </div>
  );
}

export default function Pin() {
  const [history, setHistory] = useState(Array(10).fill("white"));
  //const [currentClick, setCurrentClick] = useState("green");

  function handleUserClick(circle, updatedHistory) {
    // const nextHistory = [...history.slice(0, circle + 1), updatedHistory];
    // setHistory(nextHistory);
    setHistory(updatedHistory);
    //setCurrentClick(nextHistory.length - 1);
  }

  return (
    <div className="pin-block">
      <h1>PIN Color</h1>
      <Board history={history} onUserClick={handleUserClick}/>
    </div>
  );
}

// function checkPin() {

// }