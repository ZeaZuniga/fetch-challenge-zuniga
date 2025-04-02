import { useEffect, useState } from "react";
import "./Homepage.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Dog } from "../../utils/interfaces";
import DogCard from "../../components/DogCard/DogCard";
import FilterForm from "../../components/FilterForm/FilterForm";
import { filterFormValues } from "../../utils/interfaces";

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
      })
      .catch(function ([searchErr, breedErr]) {
        console.log(searchErr);
        console.log(breedErr);
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

  const filterSearch = (filters: filterFormValues) => {
    let filterParams = "";
    let searchURL = "https://frontend-take-home-service.fetch.com/dogs/search?";

    const paramCheck = (value: string) => {
      if (filterParams !== "") {
        filterParams = filterParams.concat(`&${value}`);
      } else if (filterParams === "") {
        filterParams = filterParams.concat(value);
      }
    };

    //This if section is to replace the functionality of URLSearchParams which will not accept arrays as input.
    //Each one of these makes sure it exists and is of the correct type before adding it to filterParams.

    if (typeof filters.ageMin === "string" && filters.ageMin !== "") {
      paramCheck(`ageMin=${filters.ageMin}`);
    }
    if (typeof filters.ageMax === "string" && filters.ageMax !== "") {
      paramCheck(`ageMax=${filters.ageMax}`);
    }
    if (
      filters.breeds &&
      filters.breeds[0] !== "" &&
      filters.breeds[0] !== undefined
    ) {
      filters.breeds.map((breed) => paramCheck(`breeds=${breed}`));
    }
    if (
      typeof filters.zipCodes === "object" &&
      filters.zipCodes[0] !== "" &&
      filters.zipCodes[0] !== undefined
    ) {
      filters.zipCodes.map((code) => paramCheck(`zipCodes=${code}`));
    }

    axios
      .get(searchURL.concat(`${filterParams}`).replaceAll(" ", "%20"), {
        withCredentials: true,
      })
      .then(({ data }) => {
        let newList = data.resultIds;
        setResultsIds(newList);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (dogList.length > 0) {
    return (
      <div className="homepage">
        <FilterForm breedArray={breeds} searchFunction={filterSearch} />
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
