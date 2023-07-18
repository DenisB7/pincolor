function CircleButton({ className, style, onUserCircleClick }) {
    return (
        <button className={className} style={style} onClick={onUserCircleClick} />
    );
}


export { CircleButton };