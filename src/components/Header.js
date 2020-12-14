import image from "../images/logo.svg";

const Header = (props) => {
  return (
    <header>
      <img className="logo" src={image} alt="logo"></img>
      <p className="title">Oh My Quizz!</p>
    </header>
  );
};
export default Header;
