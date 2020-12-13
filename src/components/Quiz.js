import React from "react";
import Header from "../components/Header";
import QuizBody from "./QuizBody";
import Form from "../components/Form";

class Quiz extends React.Component {
  state = {
    gameState: false,
    nQuestions: 0,
    gameData: [],
  };
  handleSubmit = (nQuestions, gameData) => {
    this.setState({
      gameState: true,
      nQuestions: Number(nQuestions),
      gameData,
    });
  };

  // nextQues = (props) => {
  //   this.setState({
  //     nQuestions: this.state.nQuestions - 1,
  //   });

  // };

  finishGame = () => {
    this.setState({
      gameState: false,
    });
  };

  componentDidMount() {
    console.log("quiz mounted");
  }

  render() {
    return (
      <div className="container">
        <Header />
        {!this.state.gameState && this.state.nQuestions === 0 ? (
          <Form onSubmit={this.handleSubmit} />
        ) : null}
        {this.state.gameState && this.state.nQuestions > 0 ? (
          <QuizBody
            data={this.state.gameData}
            // nextQues={this.nextQues}
            amount={this.state.nQuestions - 1}
            startNewQuiz={this.props.startNewQuiz}
          />
        ) : null}

        {/* {!this.state.gameState ? (
          <Form onSubmit={this.handleSubmit} />
        ) : (
          <QuizBody
            data={this.state.gameData}
            // nextQues={this.nextQues}
            amount={this.state.nQuestions - 1}
            startNewQuiz={this.props.startNewQuiz}
            finishGame={this.finishGame}
          />
        )} */}
      </div>
    );
  }
}
export default Quiz;
