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

function Board({ history, currentClick }) {
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
  function handleClick(index, currentClick) {
    return;
  }

  let row = 0;
  let circlesBoard = [];
  let board = [];
  history.forEach((circle, index) => {
    if (row === 3) {
      board.push(
        <div className="row">
          {circlesBoard.map(circle => circle)}
        </div>
      )
      row = 0;
      circlesBoard.length = 0;
    }
    //circlesBoard.push(<Circle key={index} value={circle[index]} onCircleClick={() => handleClick(index)} />)
    let className = "circle"
    if (circle === null) {
      className += " white";
    } else {
      className += ` ${circle}`;
    }
    //circlesBoard.push(<Circle key={index} className={className} onCircleClick={() => handleClick(index, currentClick)} />)
    circlesBoard.push(<Circle key={index} className={className} onCircleClick={() => handleClick(index)} />)
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
  const [history, setHistory] = useState(Array(10).fill(null));
  const [currentClick, setCurrentClick] = useState("green");

  return (
    <div className="pin-block">
      <h1>PIN Color</h1>
      <Board history={history}/>
    </div>
  );
}

// function checkPin() {

// }