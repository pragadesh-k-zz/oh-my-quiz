import React from "react";
import "./QuizApp.css";
import Quiz from "../components/Quiz";
// API https://opentdb.com/api.php?amount=1&category=11&difficulty=easy&type=multiple

const QuizApp = (props) => {
  const [quiz, setQuiz] = React.useState(0);
  const startNewQuiz = (props) => {
    setQuiz(quiz + 1);
  };
  return (
    <div>
      <Quiz key={quiz} startNewQuiz={startNewQuiz} />
    </div>
  );
};

// const QuizApp = () => {
//   const [seconds, setSeconds] = React.useState(10);
//   React.useEffect(() => {
//     if (seconds > 5) {
//       let time = setTimeout(() => {
//         setSeconds(seconds - 1);
//       }, 1000);
//       console.log("running settimeout");
//       return () => {
//         clearTimeout(time);
//         console.log("render first,before re-render");
//       };
//     }
//   });

//   return <div>{seconds}</div>;
// };

export default QuizApp;
