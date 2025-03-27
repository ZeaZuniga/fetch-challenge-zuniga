import "./Loginpage.scss";
import dogRun from "../../assets/icons/dogRunningPurple.png";
import home from "../../assets/icons/housePurple.png";

export default function Loginpage() {
  return (
    <div className="loginPage">
      <section className="loginPage__visual">
        <img
          src={dogRun}
          alt="A minimalist style dog running home."
          className="loginPage__dog"
        />
        <img src={home} alt="A dog house." className="loginPage__home" />
      </section>
      <form
        onSubmit={() => console.log("The form submitted!")}
        className="loginPage__loginForm"
      >
        <h2 className="loginForm__header">Log in to call your pet home!</h2>
        <label htmlFor="fetchName">Name</label>
        <input className="loginForm__input" id="fetchName" type="text" />
        <label htmlFor="fetchEmail">Email</label>
        <input className="loginForm__input" id="fetchEmail" type="text" />
        <input type="submit" value="Log In" />
      </form>
    </div>
  );
}
