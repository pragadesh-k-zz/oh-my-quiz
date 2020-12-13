const PlayAgain = (props) => (
  <div className="again">
    <p className="greet">Nice Try!</p>
    <button className="btn-playagain" onClick={props.startNewQuiz}>
      Play Again
    </button>
  </div>
);
export default PlayAgain;
