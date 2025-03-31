import { useEffect, useState } from "react";
import "./Homepage.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Dog } from "../../utils/interfaces";
import DogCard from "../../components/DogCard/DogCard";

export default function Homepage() {
  const [resultsIds, setResultsIds] = useState<[]>([]);
  const [dogList, setDogList] = useState<Dog[]>([]);
  const [breeds, setBreeds] = useState<[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      axios.get("https://frontend-take-home-service.fetch.com/dogs/search", {
        withCredentials: true,
      }),
      axios.get("https://frontend-take-home-service.fetch.com/dogs/breeds", {
        withCredentials: true,
      }),
    ])
      .then(function ([searchRes, breedRes]) {
        let newList = searchRes.data.resultIds;
        setResultsIds(newList);

        setBreeds(breedRes.data);
        console.log(breeds);
      })
      .catch(function ([searchErr, breedErr]) {
        console.log(searchErr);
        console.log(breedErr);
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

  if (dogList.length > 0) {
    return (
      <div className="homepage">
        <ul className="homepage__searchList">
          {dogList.map((dogObject: Dog, i: number) => {
            return <DogCard dogData={dogObject} key={i} />;
          })}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="homepage">
        <h2>Homepage</h2>
      </div>
    );
  }
}
