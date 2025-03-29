import axios from "axios";
import "./Navbar.scss";

export default function Navbar() {
  const handleLogOut = () => {
    axios
      .post(
        "https://frontend-take-home-service.fetch.com/auth/logout",
        {},
        {
          withCredentials: true,
        }
      )
      .then((data) => {
        alert("You have logged out!");
        console.log("User Is Logged out", data);
      })
      .catch((error) => {
        console.error(error);
        alert("There was an error logging you out.");
      });
  };

  return (
    <div>
      <h1>navbar</h1>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
}
