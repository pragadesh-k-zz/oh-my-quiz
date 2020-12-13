import React from "react";
import "./QuizApp.css";
import Quiz from "../components/Quiz";
// API https://opentdb.com/api.php?amount=1&category=11&difficulty=easy&type=multiple

// const QuizApp = (props) => {
//   const [quiz, setQuiz] = React.useState(0);
//   const startNewQuiz = (props) => {
//     setQuiz(quiz + 1);
//   };
//   return (
//     <div>
//       <Quiz key={quiz} startNewQuiz={startNewQuiz} />
//     </div>
//   );
// };

export default class QuizApp extends React.Component {
  state = {
    key: 1,
  };
  startNewQuiz = () => {
    this.setState({
      key: this.state.key + 1,
    });
  };
  render() {
    const { key } = this.state;
    return (
      <div>
        <Quiz key={key} startNewQuiz={this.startNewQuiz} />
      </div>
    );
  }
}
