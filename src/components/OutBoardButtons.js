function SaveButton({ handleUserClickOnSaveButton }) {
    return <button className="save" onClick={handleUserClickOnSaveButton}>save</button>
}


function ResetButton({ handleUserClickOnResetButton }) {
    return <button className="reset" onClick={handleUserClickOnResetButton}>reset</button>
}


function ConfirmButton({ handleUserClickOnConfirmButton }) {
    return <button className="confirm" onClick={handleUserClickOnConfirmButton}>confirm</button>
}


export { SaveButton, ResetButton, ConfirmButton };