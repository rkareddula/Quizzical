import Question from "./Question";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { decode } from "html-entities";

import Confetti from "react-confetti";

export default function Questions() {
    const [questions, setQuestions] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [numberOfCorrectAnswers, setnumberOfCorrectAnswers] = useState(0);
    const [isCheckAnswersClicked, setisCheckAnswersClicked] = useState(false);

    useEffect(
        function () {
            fetch(
                "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple&category=9"
            )
                .then((response) => response.json())
                .then((data) => {
                    // MODIFY ARRAY TO INCLUDE CORRECT ANSWER AT RANDOM
                    const dataArray = data.results.map((item) => {
                        return {
                            ...item,
                            selectedAnswer: null,
                            id: uuidv4(),
                            answers: item.incorrect_answers.map((item) =>
                                decode(item)
                            ),
                            correct_answer: decode(item.correct_answer),
                        };
                    });

                    // FUNCTION TO GENERATE RANDOM INDEX
                    function generateRandomIndex() {
                        return Math.floor(Math.random() * 4);
                    }

                    // INSERTING CORRECT ANSWER AT RANDOM INDEX IN ARRAY OF ANSWERS
                    dataArray.forEach((item) => {
                        item.answers.splice(
                            generateRandomIndex(),
                            0,
                            decode(item.correct_answer)
                        );
                    });
                    // SET QUESTIONS WITH MODIFIED ARRAY
                    setQuestions(dataArray);
                });
        },
        [gameOver]
    );

    function selectAnswer(id) {
        setQuestions((prevQuestions) =>
            prevQuestions.map((item) => {
                return item.id === id
                    ? { ...item, selectedAnswer: event.target.textContent }
                    : item;
            })
        );
    }

    const getQuestions = questions.map((question, index) => {
        return (
            <Question
                id={question.id}
                key={index}
                question={question}
                selectAnswer={selectAnswer}
                gameOver={gameOver}
                isCheckAnswersClicked={isCheckAnswersClicked}
            />
        );
    });

    function handleCheckAnswers() {
        // CHANGE
        setisCheckAnswersClicked((prevCheckAnswers) => !prevCheckAnswers);
        questions.forEach((question) => {
            if (decode(question.correct_answer) === question.selectedAnswer) {
                setnumberOfCorrectAnswers(
                    (prevCorrectAnswer) => prevCorrectAnswer + 1
                );
            }
        });
    }

    function resetGame() {
        setGameOver((prevGameOver) => !prevGameOver);
        setisCheckAnswersClicked((prevCheckAnswers) => !prevCheckAnswers);
        setnumberOfCorrectAnswers(0);
    }

    return (
        <>
            {getQuestions}
            {!isCheckAnswersClicked ? (
                <button className="btn middle" onClick={handleCheckAnswers}>
                    Check Answers
                </button>
            ) : (
                <section className="middle">
                    <span className="score">
                        You scored {numberOfCorrectAnswers}/5 correct answers
                    </span>
                    <button className="btn" onClick={resetGame}>
                        Play Again
                    </button>
                </section>
            )}
            {numberOfCorrectAnswers === 5 && (
                <Confetti recycle={false} numberOfPieces={1000} height={1080} />
            )}
        </>
    );
}
