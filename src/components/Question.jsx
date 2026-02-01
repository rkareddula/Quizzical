import { decode } from "html-entities";

export default function Question(props) {
    const displayAllAnswers = props.question.answers.map((answer) => {
        function disabledAnswers() {
            if (
                props.isCheckAnswersClicked &&
                answer !== props.question.correct_answer
            ) {
                return true;
            }
        }

        return (
            <button
                onClick={() => props.selectAnswer(props.id)}
                className={`answer ${
                    answer === props.question.selectedAnswer
                        ? "selectedanswer"
                        : null
                } ${
                    props.isCheckAnswersClicked &&
                    answer === props.question.correct_answer
                        ? "correctanswer"
                        : null
                } ${
                    props.isCheckAnswersClicked &&
                    answer === props.question.selectedAnswer &&
                    answer !== props.question.correct_answer
                        ? "wronganswer"
                        : null
                }`}
                key={answer}
                disabled={disabledAnswers()}
            >
                {decode(answer)}
            </button>
        );
    });

    return (
        <section>
            <h2 className="question">{decode(props.question.question)}</h2>
            <div className="answers-container">{displayAllAnswers}</div>
            <hr />
        </section>
    );
}
