import React from "react";
import Header from "../components/Header";
import QuizBody from "./QuizBody";
import Form from "../components/Form";
import PlayAgain from "./PlayAgain";

class Quiz extends React.Component {
  state = {
    gameState: false,
    nQuestions: 0,
    gameData: [],
    questionNumber: 0,
    timer: 15,
    choice: "",
    status: "",
    answered: 0,
  };
  componentDidMount() {
    console.log("quiz mounted");
  }

  // get the data from API
  handleSubmit = (nQuestions, gameData) => {
    this.setState({
      gameState: true,
      nQuestions,
      gameData,
    });
  };

  nextQuestion = () => {
    if (this.state.nQuestions - 1 !== this.state.questionNumber) {
      this.setState({
        questionNumber: this.state.questionNumber + 1,
        timer: 10,
        choice: "",
        status: "",
      });
    } else {
      this.setState({
        gameState: false,
      });
    }
  };

  setSeconds = () => {
    if (this.state.timer > 0) {
      this.setState({ timer: this.state.timer - 1 });
    } else {
      this.nextQuestion();
    }
  };

  checkAnswer = (choice) => {
    if (
      this.state.choice === "" &&
      this.state.status === "" &&
      this.state.timer !== 0
    ) {
      if (
        choice === this.state.gameData[this.state.questionNumber].correct_answer
      ) {
        this.setState({
          choice,
          status: "green",
          answered: this.state.answered + 1,
        });
      } else {
        this.setState({ choice, status: "red" });
      }
    }
  };

  render() {
    const {
      gameData,
      gameState,
      nQuestions,
      questionNumber,
      timer,
      choice,
      status,
      answered,
    } = this.state;
    return (
      <div className="container">
        <Header />
        {!gameState && nQuestions === 0 ? (
          <Form onSubmit={this.handleSubmit} />
        ) : null}
        {gameState && nQuestions > 0 ? (
          <QuizBody
            data={gameData[questionNumber]}
            timer={timer}
            nextQuestion={this.nextQuestion}
            setSeconds={this.setSeconds}
            checkAnswer={this.checkAnswer}
            choiceState={{ choice, status }}
          />
        ) : null}
        {!gameState && nQuestions > 0 ? (
          <PlayAgain
            startNewQuiz={this.props.startNewQuiz}
            status={{ nQuestions, answered }}
          />
        ) : null}
      </div>
    );
  }
}
export default Quiz;
