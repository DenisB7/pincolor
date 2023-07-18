import { CircleButton } from "./OnBoardButtons.js";


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


export { Board };