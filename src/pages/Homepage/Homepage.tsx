import { useEffect } from "react";
import "./Homepage.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://frontend-take-home-service.fetch.com/dogs/search")
      .then((data) => {
        console.log("Here are your dogs!", data);
      })
      .catch((error) => {
        console.error(error);
        alert("There was an error logging you in.");
        navigate("/login");
      });
  });

  return (
    <div>
      <h2>Homepage</h2>
    </div>
  );
}
