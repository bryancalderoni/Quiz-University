import React, { useState } from "react";
import { resultInitalState } from "./constants";

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [result, setResult] = useState(resultInitalState);
  const [showResult, setShowResult] = useState(false);
  const [wrongAnswerSelected, setWrongAnswerSelected] = useState(false);
  const [responses, setResponses] = useState([]);

  const { question, choices, correctAnswer } = questions[currentQuestion];

  const onAnswerClick = (index) => {
    setAnswerIdx(index);
  };

  const onClickNext = () => {
    setAnswerIdx(null);

    if (answerIdx !== null) {
      const selectedChoice = choices[answerIdx];
      const correctAnswerIndex = correctAnswer - 1;
      if (selectedChoice === choices[correctAnswerIndex]) {
        setResult((prev) => ({
          ...prev,
          score: prev.score + 5,
          correctAnswers: prev.correctAnswers + 1,
        }));
      } else {
        setWrongAnswerSelected(true);
        setResult((prev) => ({
          ...prev,
          wrongAnswers: prev.wrongAnswers + 1,
        }));
      }
    }

    const selectedAnswer = answerIdx !== null ? choices[answerIdx] : "No answer selected";
    const correctAnswerText = choices[correctAnswer - 1];
    const response = {
      question,
      selectedAnswer,
      correctAnswer: correctAnswerText,
    };

    setResponses((prevResponses) => [...prevResponses, response]);

    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }

    setWrongAnswerSelected(false);
  };

  const onTryAgain = () => {
    setResult(resultInitalState);
    setShowResult(false);
    setResponses([]);
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
                onClick={() => {
                  if (!showResult) {
                    onAnswerClick(index);
                    setWrongAnswerSelected(index !== correctAnswer - 1);
                  }
                }}
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
          <div>
            <h4>Responses:</h4>
            <ul>
              {responses.map((response, index) => (
                <li key={index}>
                  <p>
                   <span className="result-question">Question: {response.question}</span>
                    <br />
                    <span className="result-answer">Your Answer: {response.selectedAnswer}</span>
                    <br />
                    <span className="result-correct-answer">Correct Answer: {response.correctAnswer}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <button onClick={onTryAgain}>Try again</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
