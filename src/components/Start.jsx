export default function Start(props) {
    return (
        <div className="start-page">
            <h1>Quizzical</h1>
            <p>Test your knowledge of the world</p>
            <button className="btn" onClick={() => props.getQuestions()}>
                Start quiz
            </button>
        </div>
    );
}
