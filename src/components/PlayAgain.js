const PlayAgain = (props) => (
  <div className="again">
    <p className="greet">Nice Try!</p>
    <button className="btn-playagain" onClick={props.startNewQuiz}>
      Play Again
    </button>
    <p
      style={{
        padding: "1rem",
        margin: "10px 0px",
        textShadow: "0px 0px 20px white",
      }}
    >
      Correct : {props.status.answered} / {props.status.nQuestions}
    </p>
  </div>
);
export default PlayAgain;
