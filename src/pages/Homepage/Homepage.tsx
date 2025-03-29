import { useEffect, useState } from "react";
import "./Homepage.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Dog } from "../../utils/interfaces";

export default function Homepage() {
  const [resultsIds, setResultsIds] = useState<[]>([]);
  const [dogList, setDogList] = useState<[Dog?]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://frontend-take-home-service.fetch.com/dogs/search", {
        withCredentials: true,
      })
      .then((res) => {
        let newList = res.data.resultIds;
        setResultsIds(newList);
      })
      .catch((error) => {
        console.error(error);
        navigate("/login");
      });
  }, []);

  useEffect(() => {
    if (resultsIds.length !== 0) {
      axios
        .post("https://frontend-take-home-service.fetch.com/dogs", resultsIds, {
          withCredentials: true,
        })
        .then((res) => {
          setDogList(res.data);
        })
        .catch((error) => {
          alert(
            "There was an issue requesting Dog List data. Please try again later."
          );
          console.error(error);
        });
    } else {
      return;
    }
  }, [resultsIds]);

  return (
    <div className="homepage">
      <h2>Homepage</h2>
    </div>
  );
}
