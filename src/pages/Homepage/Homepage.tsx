import { useEffect, useState } from "react";
import "./Homepage.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Dog } from "../../utils/interfaces";
import DogCard from "../../components/DogCard/DogCard";
import FilterForm from "../../components/FilterForm/FilterForm";
import { filterFormValues } from "../../utils/interfaces";
import FavDogs from "../../components/FavDogs/FavDogs";
import dogWalk from "../../assets/svg/dogWalk.svg";
import Pagination from "../../components/Pagination/Pagination";

export default function Homepage() {
  //Regarding these useStates, the next steps for this project would be to
  //store the states in session storage to have persistent search results
  //through page refreshes and going back to different pages.

  const [resultsIds, setResultsIds] = useState<[]>([]);
  const [dogList, setDogList] = useState<Dog[]>([]);
  const [breeds, setBreeds] = useState<[]>([]);
  const [nextSearch, setNextSearch] = useState<string>("");
  const [prevSearch, setPrevSearch] = useState<string>("");
  const [totalSearch, setTotalSearch] = useState<number>(0);
  const [favIds, setFavIds] = useState<string[]>([]);

  const navigate = useNavigate();

  const baseURL = "https://frontend-take-home-service.fetch.com";

  useEffect(() => {
    axiosGetRequest("/dogs/search?sort=breed:asc");

    axios
      .get(`${baseURL}/dogs/breeds`, {
        withCredentials: true,
      })
      .then((res) => {
        setBreeds(res.data);
      })
      .catch((err) => {
        console.error(err);
        navigate("/login");
      });
  }, []);

  //This function takes the results of any search and sends it to the server for
  //more information on each dog object returned.
  useEffect(() => {
    if (resultsIds.length !== 0) {
      axios
        .post(`${baseURL}/dogs`, resultsIds, {
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
          navigate("/");
        });
    } else {
      return;
    }
  }, [resultsIds]);

  const axiosGetRequest = (search: string) => {
    axios
      .get(baseURL.concat(search), { withCredentials: true })
      .then((res) => {
        let newList = res.data.resultIds;
        setResultsIds(newList);
        setNextSearch(res.data.next);
        setTotalSearch(res.data.total);
        if (res.data.pre) {
          setPrevSearch(res.data.prev);
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .catch((error) => {
        console.error(error);
        if (error.data === "Unauthorized") {
          navigate("/");
        }
      });
  };

  const filterMakeParams = (filters: filterFormValues) => {
    let filterParams = "";

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
    if (typeof filters.sort === "string" && filters.sort !== "") {
      paramCheck(`sort=${filters.sort}`);
    }

    axiosGetRequest(`/dogs/search?${filterParams}`.replaceAll(" ", "%20"));
  };

  if (dogList.length > 0) {
    return (
      <div className="homepage">
        <section className="homepage__header">
          <img
            src={dogWalk}
            alt="A man walking his dog in a minimalist art style"
            className="header__img"
          />
          <h1 className="header__title">Find your buddy below!</h1>
        </section>
        <FilterForm breedArray={breeds} searchFunction={filterMakeParams} />
        <ul className="homepage__searchList">
          {dogList.map((dogObject: Dog, i: number) => {
            return (
              <DogCard
                dogData={dogObject}
                favIds={favIds}
                setFavIds={setFavIds}
                key={i}
              />
            );
          })}
        </ul>
        <Pagination
          totalItems={totalSearch}
          currentSearch={baseURL.concat(nextSearch)}
          axiosGetRequest={axiosGetRequest}
        />
        {favIds[0] && <FavDogs favIds={favIds} setFavIds={setFavIds} />}
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
