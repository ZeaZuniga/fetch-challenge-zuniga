import "./Loginpage.scss";
import dogSvg from "../../assets/svg/dog.svg";
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
      <img
        src={dogSvg}
        alt="A minimalist style dog."
        className="loginPage__dog"
      />
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="loginPage__loginForm"
      >
        <h2 className="loginForm__header">Log in to call your pet home!</h2>
        <label className="loginForm__label" htmlFor="fetchName">
          Name
        </label>
        <input
          {...register("name")}
          className="loginForm__input loginForm__input--name"
          id="fetchName"
          type="text"
          placeholder="John Doe"
          required
        />
        <label className="loginForm__label" htmlFor="fetchEmail">
          Email
        </label>
        <input
          {...register("email")}
          className="loginForm__input"
          id="fetchEmail"
          type="email"
          placeholder="email@provider.com"
          required
        />
        <input className="loginForm__button" type="submit" value="Log In" />
      </form>
    </div>
  );
}
