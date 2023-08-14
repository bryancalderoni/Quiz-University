import React, { useState } from "react";
import { resultInitalState } from "./constants";

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [result, setResult] = useState(resultInitalState);
  const [showResult, setShowResult] = useState(false);
  const [wrongAnswerSelected, setWrongAnswerSelected] = useState(false);

  const { question, choices, correctAnswer } = questions[currentQuestion];

  const onAnswerClick = (index) => {
    setAnswerIdx(index);
  };

  const onClickNext = () => {
    setAnswerIdx(null);
  
    if (answerIdx !== null) {
      const selectedChoice = choices[answerIdx];
      const correctAnswerIndex = correctAnswer - 1; // Trasforma in 0-based index
      if (selectedChoice === choices[correctAnswerIndex]) {
        setResult((prev) => ({
          ...prev,
          score: prev.score + 5,
          correctAnswers: prev.correctAnswers + 1,
        }));
      } else {
        setWrongAnswerSelected(true); // Imposta lo stato di wrongAnswerSelected a true quando c'è una risposta sbagliata
        setResult((prev) => ({
          ...prev,
          wrongAnswers: prev.wrongAnswers + 1,
        }));
      }
    }
  
    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }
  
    setWrongAnswerSelected(false); // Reimposta lo stato di wrongAnswerSelected a false
  };
  

  const onTryAgain = () => {
    setResult(resultInitalState);
    setShowResult(false);
  };

  return (
    <div className="quiz-container">
      {!showResult ? (
        <>
          <span className="active-question-no">{currentQuestion + 1}</span>
          <span className="total-question">/{questions.length}</span>
          <h2>{question}</h2>
          <ul>
            {choices.map((choice, index) => (
              <li
                onClick={() => onAnswerClick(index)}
                key={choice}
                className={`${answerIdx === index ? "selected-answer" : ""} ${
                  wrongAnswerSelected && index === correctAnswer - 1
                    ? "correct-answer-highlight"
                    : ""
                }`}
              >
                {choice}
              </li>
            ))}
          </ul>
          <div className="footer">
            <button onClick={onClickNext} disabled={answerIdx === null}>
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </>
      ) : (
        <div className="result">
          <h3>Result</h3>
          <p>
            Total Questions: <span>{questions.length}</span>
          </p>
          <p>
            Total Score: <span>{result.score}</span>
          </p>
          <p>
            Correct Answers: <span>{result.correctAnswers}</span>
          </p>
          <p>
            Wrong Answers: <span>{result.wrongAnswers}</span>
          </p>
          <button onClick={onTryAgain}>Try again</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
