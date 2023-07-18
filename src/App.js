import { useState } from "react";

import { Board } from "./components/Board.js";
import * as buttons from "./components/OutBoardButtons.js";


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

    let handleUserClickOnSaveButton = () => {
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

    let handleUserClickOnResetButton = () => {
        setHistory(Array(10).fill("#FFFFFF"));
        setSavedPinColor([]);
        document.getElementById("message-to-user").textContent = "Choose 4 colors by clicking on circles, remember it and SAVE!";
        document.getElementById("show-pin-message").textContent = "your pin you will see here";
    };

    let handleUserClickOnConfirmButton = () => {
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
                <buttons.SaveButton handleUserClickOnSaveButton={handleUserClickOnSaveButton}/>
            </div>
            <Board
                history={history}
                onUserCircleClick={handleUserClickOnCircle}
                savedPinColor={savedPinColor}
                confirmed={confirmed}
            />
            <div className="buttons">
                <buttons.ResetButton handleUserClickOnResetButton={handleUserClickOnResetButton}/>
                <buttons.ConfirmButton handleUserClickOnConfirmButton={handleUserClickOnConfirmButton}/>
            </div>
            <p id="show-pin-message">your pin you will see here</p>
        </div>
    );
}