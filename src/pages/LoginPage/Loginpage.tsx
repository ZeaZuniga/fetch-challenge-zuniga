import "./Loginpage.scss";
import dogRun from "../../assets/icons/dogRunningPurple.png";
import home from "../../assets/icons/housePurple.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Loginpage() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const navigate = useNavigate();

  const handleLogin = (content: object) => {
    console.log(content);

    axios
      .post(
        "https://frontend-take-home-service.fetch.com/auth/login",
        content,
        { withCredentials: true }
      )
      .then(() => {
        console.log("User Is Logged In");
        navigate("/home");
      })
      .catch((error) => {
        console.error(error);
        alert("There was an error logging you in.");
      });
  };

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
        onSubmit={handleSubmit(handleLogin)}
        className="loginPage__loginForm"
      >
        <h2 className="loginForm__header">Log in to call your pet home!</h2>
        <label htmlFor="fetchName">Name</label>
        <input
          {...register("name")}
          className="loginForm__input"
          id="fetchName"
          type="text"
        />
        <label htmlFor="fetchEmail">Email</label>
        <input
          {...register("email")}
          className="loginForm__input"
          id="fetchEmail"
          type="text"
        />
        <input type="submit" value="Log In" />
      </form>
    </div>
  );
}
