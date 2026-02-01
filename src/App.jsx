import React from "react";
import Start from "./components/Start";
import Questions from "./components/Questions";

export default function App() {
    const [startQuiz, setStartQuiz] = React.useState(false);

    function handleStartQuiz() {
        setStartQuiz((prevStartQuiz) => !prevStartQuiz);
    }

    return (
        <>
            {startQuiz ? (
                <Questions />
            ) : (
                <Start getQuestions={handleStartQuiz} />
            )}
        </>
    );
}
