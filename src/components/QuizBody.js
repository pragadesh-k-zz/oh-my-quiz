import React, { useEffect, Component } from "react";
export default class QuizBody extends Component {
  render() {
    const { choice, status } = this.props.choiceState;
    return (
      <div>
        <Question question={this.props.data.question} />
        <Timer seconds={this.props.timer} setSeconds={this.props.setSeconds} />
        <OptionSection
          options={this.props.data.updated_options}
          checkAnswer={this.props.checkAnswer}
          choice={choice}
          status={status}
          correct_answer={this.props.data.correct_answer}
        />
        <div className="next-section">
          <button className="btn-next" onClick={this.props.nextQuestion}>
            Next
          </button>
        </div>
      </div>
    );
  }
}

const Question = (props) => {
  return (
    <div className="question-box question">
      <p dangerouslySetInnerHTML={{ __html: props.question }}></p>
    </div>
  );
};

const Timer = (props) => {
  useEffect(() => {
    const timerId = setTimeout(() => {
      props.setSeconds();
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [props]);
  return (
    <div className="timer-box">
      <div className="time-bar">
        <p className="seconds">{props.seconds}</p>
      </div>
    </div>
  );
};

const Option = (props) => {
  const color = {
    white: "white",
    red: "red",
    green: "green",
  };
  const setColor =
    props.choice === "" && props.status === ""
      ? color.white
      : props.choice === props.option[1]
      ? color[props.status]
      : props.option[1] === props.correct_answer
      ? color.green
      : color.white;
  return (
    <div
      className="option-box"
      style={{ backgroundColor: setColor }}
      onClick={props.checkAnswer.bind(this, props.option[1])}
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
  return (
    <div className="option-section">
      {props.options.map((option, key) => (
        <Option
          key={key}
          option={option}
          checkAnswer={props.checkAnswer}
          choice={props.choice}
          status={props.status}
          correct_answer={props.correct_answer}
        />
      ))}
    </div>
  );
};
