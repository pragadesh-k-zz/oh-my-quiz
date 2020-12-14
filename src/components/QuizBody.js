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
  const icon = {
    white: ["none", "none"],
    red: ["fa fa-times", "#fc4828"],
    green: ["fa fa-check", "#28fc68"],
  };
  const setIcon =
    props.choice === "" && props.status === ""
      ? icon.white
      : props.choice === props.option[1]
      ? icon[props.status]
      : props.option[1] === props.correct_answer
      ? icon.green
      : icon.white;
  return (
    <div
      className="option-box"
      onClick={props.checkAnswer.bind(this, props.option[1])}
    >
      <div className={`badge ${props.option[0]}`}>{props.option[0]}</div>
      <span
        className="option-text"
        dangerouslySetInnerHTML={{ __html: props.option[1] }}
      ></span>
      <span
        className={setIcon[0] !== "none" ? setIcon[0] : ""}
        style={{
          float: "right",
          color: setIcon[1] !== "none" ? setIcon[1] : "none",
        }}
      ></span>
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
