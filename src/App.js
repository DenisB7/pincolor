

function Circle(onCircleClick) {
  return (
    <button className="circle" onClick={onCircleClick} />
  );
}

function Board() {
  return (
    <div className="pin">
      <div className="row">
        <Circle />
        <Circle />
        <Circle />
      </div>
      <div className="row">
        <Circle />
        <Circle />
        <Circle />
      </div>
      <div className="row">
        <Circle />
        <Circle />
        <Circle />
      </div>
    </div>
  );
}

export default function Pin() {
  return (
    <div className="pin-block">
      <h1>PIN Color</h1>
      <Board />
    </div>
  );
}

function checkPin() {

}