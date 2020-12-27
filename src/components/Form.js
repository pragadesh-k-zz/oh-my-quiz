import React from "react";
class Form extends React.Component {
  state = {
    nQuestions: "",
    load: false,
  };

  // update the response options with A,B,C,D;
  updateData = (data) => {
    const alpha = ["A", "B", "C", "D"];
    data.forEach((element) => {
      let temp = [],
        shuffled_options;
      const random = Math.floor(
        Math.random() * element.incorrect_answers.length
      );
      element.incorrect_answers.map((option) => temp.push(option));
      temp.splice(random, 0, element.correct_answer);
      shuffled_options = alpha.map((option, index) => [option, temp[index]]);
      element["updated_options"] = shuffled_options;
    });
    return data;
  };

  // Fetch the data from DB
  fetchData = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${this.state.nQuestions}&category=11&difficulty=easy&type=multiple`
    );
    // response data
    const data = await response.json();
    // updating data with options A,B,C,D
    const result = this.updateData(data.results);
    this.setState({ load: true });

    // Timer
    setTimeout(() => {
      // submit the data to the main app
      this.props.onSubmit(Number(this.state.nQuestions), result);
    }, 5000);
  };

  handleRender = () => {
    if (!this.state.load) {
      return (
        <form onSubmit={this.fetchData}>
          <div className="form-section">
            <input
              type="number"
              value={this.state.nQuestions}
              onChange={(event) =>
                this.setState({ nQuestions: event.target.value })
              }
              required={true}
              min="1"
              className="input-ques"
              placeholder="No.Of.Questions"
              max="15"
            />
            <button className="btn-start">Start Quiz.</button>
          </div>
        </form>
      );
    } else {
      return <Loader />;
    }
  };

  render() {
    return <>{this.handleRender()}</>;
  }
}

function Loader() {
  return (
    <div className="loading">
      <p>Setting up...</p>
      <div className="loader"></div>
      <sub>Prepare yourself</sub>
    </div>
  );
}

export default Form;
