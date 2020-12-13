import React, { useState, useEffect } from "react";
import PlayAgain from "./PlayAgain";
const QuizBody = (props) => {
  console.log(props.data);
  const [count, setcount] = useState(props.amount);
  const [questionData, setquestionData] = useState(props.data[count]);
  const [seconds, setSeconds] = useState(20);
  const [endGame, setEndGame] = useState(false);

  useEffect(() => {
    setquestionData(props.data[count]);
    console.log("useeffect runned");

    if (seconds > 0 && !endGame) {
      let timeOut = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
      console.log(seconds);
      return () => clearTimeout(timeOut);
    }
  }, [props.data, count, questionData.incorrect_answers, seconds, endGame]);

  const nextQuestion = () => {
    if (count > 0) {
      setcount(count - 1);
      setSeconds(20);
    } else {
      setEndGame(true);
    }
  };

  if (seconds === 0 && !endGame) {
    nextQuestion();
    console.log(seconds);
  }

  return (
    <>
      {endGame ? (
        <PlayAgain startNewQuiz={props.startNewQuiz} />
      ) : (
        <>
          <Question question={questionData.question} />
          <Timer seconds={seconds} />
          <OptionSection
            options={questionData.updated_options}
            correct_answer={questionData.correct_answer}
          />
          <div className="next-section">
            <button className="btn-next" onClick={nextQuestion}>
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
};

const Question = (props) => {
  return (
    <div className="question-box question">
      <p dangerouslySetInnerHTML={{ __html: props.question }}></p>
    </div>
  );
};

const Timer = (props) => {
  return (
    <div className="timer-box">
      <div className="time-bar">
        <p className="seconds">{props.seconds}</p>
      </div>
    </div>
  );
};

const Option = (props) => {
  return (
    <div
      className="option-box"
      onClick={() => props.setValue(props.option[1])}
      style={{
        backgroundColor: props.color,
      }}
    >
      <div className={`badge ${props.option[0]}`}>{props.option[0]}</div>
      <p
        className="option-text"
        dangerouslySetInnerHTML={{ __html: props.option[1] }}
      ></p>
    </div>
  );
};

const OptionSection = (props) => {
  // console.log("updating option section");
  const [value, setvalue] = useState("");
  const checkAnswer = (value) => {
    return value === props.correct_answer ? "green" : "red";
  };
  const color = {
    white: "white",
    red: "red",
    green: "green",
  };

  return (
    <div className="option-section">
      {props.options.map((option, key) => (
        <Option
          key={key}
          option={option}
          color={option[1] === value ? checkAnswer(value) : "white"}
          setValue={setvalue}
        />
      ))}
    </div>
  );
};

export default QuizBody;
