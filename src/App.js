

function Circle() {

}

function Board() {
  return (
    <div className="pin">
      <div className="row">
        <button className="circle"></button>
        <button className="circle"></button>
        <button className="circle"></button>
      </div>
      <div className="row">
        <button className="circle"></button>
        <button className="circle"></button>
        <button className="circle"></button>
      </div>
      <div className="row">
        <button className="circle"></button>
        <button className="circle"></button>
        <button className="circle"></button>
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