import React from "react";
class Form extends React.Component {
  state = {
    nQuestions: 1,
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
    // submit the data to the main app
    this.props.onSubmit(Number(this.state.nQuestions), result);
  };

  render() {
    return (
      <form onSubmit={this.fetchData}>
        <input
          type="number"
          value={this.state.nQuestions}
          onChange={(event) =>
            this.setState({ nQuestions: event.target.value })
          }
          required={true}
          min="1"
          className="input-ques"
        />
        <button className="btn-start">Start Quiz.</button>
      </form>
    );
  }
}
export default Form;
