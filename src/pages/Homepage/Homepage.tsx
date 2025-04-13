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
import dogLost from "../../assets/svg/personLost.svg";

interface HomepageProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  setModalData: (data: Dog) => void;
  getMatched: (favIds: string[]) => void;
}

export default function Homepage(props: HomepageProps) {
  //Regarding these useStates, the next steps for this project would be to
  //store the states relating to search parameters in session storage to have
  //persistent search results through page refreshes and going back to different pages.

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [resultsIds, setResultsIds] = useState<[]>([]);
  const [dogList, setDogList] = useState<Dog[]>([]);
  const [breeds, setBreeds] = useState<[]>([]);
  const [nextSearch, setNextSearch] = useState<string>("");
  const [totalSearch, setTotalSearch] = useState<number>(0);
  const [favIds, setFavIds] = useState<string[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);

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
        navigate("/");
      });
  }, []);

  //This function takes the results of any search and sends it to the server for
  //more information on each dog object returned.
  // To make the zipCodes for each dog easier to read for the user,
  // the secondary axios call swaps out the zip codes
  // with the city and state attached to the zip code.

  //One known error is when making filter request for "African Hunting Dog"
  //With no other changes, the zip code from "yMD-OZUBBPFf4ZNZzDmI" Willard
  //Returns from post /locations as null, causing a rendering error. Without
  //Being able to resolve this issue itself, I just skipped swapping the zip
  //Code with the city/state for the brevity of this challenge.
  useEffect(() => {
    if (resultsIds.length !== 0) {
      axios
        .post(`${baseURL}/dogs`, resultsIds, {
          withCredentials: true,
        })
        .then((idRes) => {
          let idResZipCodes: string[] = [];
          let editedDogs: Dog[] = [];

          idRes.data.forEach((entry: Dog) => {
            idResZipCodes.push(entry.zip_code);
          });

          axios
            .post(`${baseURL}/locations`, idResZipCodes, {
              withCredentials: true,
            })
            .then((locRes) => {
              idRes.data.forEach((entry: Dog, i: number) => {
                if (locRes.data[i] !== null) {
                  entry.zip_code = `${locRes.data[i].city}, ${locRes.data[i].state}`;
                }
                editedDogs.push(entry);
              });

              setDogList(editedDogs);
              setIsLoading(false);
            })
            .catch((locErr) => {
              console.log(locErr);
            });
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
    setIsLoading(true);

    axios
      .get(baseURL.concat(search), { withCredentials: true })
      .then((res) => {
        if (res.data.resultIds[0]) {
          let newList = res.data.resultIds;
          setResultsIds(newList);
          setNextSearch(res.data.next);
          setTotalSearch(res.data.total);
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          setDogList([]);
          setIsLoading(false);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
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

  //The conditional rendering is structure like this because of a known issue when unmounting
  //And remounting the Pagination element where it treats every page like the first since it
  //Defaults to 1st page on each render. Keeping it rendered even through loading states
  //Is my quick workaround to this issue. Original idea (as evident in the git commits) was
  //To have an entire loading screen to minimize code, but this will have to do for now.
  return (
    <div className="homepage">
      <section className="homepage__headContainer">
        {isLoading ? (
          <div className="homepage__header homepage__header--loading">
            <img
              src={dogLost}
              alt="A man looking for his dog in a minimalist art style"
              className="header__img header__img--loading"
            />
            <h1 className="header__title header__title--loading">
              Loading dogs!
            </h1>
          </div>
        ) : (
          <div className="homepage__header">
            <img
              src={dogWalk}
              alt="A man walking his dog in a minimalist art style"
              className="header__img"
            />
            <h1 className="header__title">Find your buddy below!</h1>
          </div>
        )}
      </section>
      <section className="homepage__contentContainer">
        {isLoading ? (
          <div className="loading__button"></div>
        ) : (
          <FilterForm breedArray={breeds} searchFunction={filterMakeParams} />
        )}
        <div className="homepage__listContainer">
          {isLoading && (
            <ul className="loading__list">
              {Array.from({ length: 6 }, (_, i) => (
                <li className="loading__card" key={i}>
                  <div className="loading__card--top"></div>
                  <div className="loading__card--bottom">
                    <p className="loading__card--text"></p>
                    <p className="loading__card--text"></p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {!isLoading && dogList.length > 0 && (
            <ul className="homepage__searchList">
              {dogList.map((dogObject: Dog, i: number) => {
                return (
                  <DogCard
                    dogData={dogObject}
                    favIds={favIds}
                    setFavIds={setFavIds}
                    setIsModalOpen={props.setIsModalOpen}
                    setModalData={props.setModalData}
                    key={i}
                  />
                );
              })}
            </ul>
          )}
          {!isLoading && dogList.length < 1 && (
            <h2 className="homepage__noResults">
              Looks like there wasn't anything matching that search query. Try a
              different search.
            </h2>
          )}
          <Pagination
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            totalItems={totalSearch}
            currentSearch={baseURL.concat(nextSearch)}
            axiosGetRequest={axiosGetRequest}
          />
        </div>
      </section>
      {favIds[0] && (
        <FavDogs
          favIds={favIds}
          setFavIds={setFavIds}
          getMatched={props.getMatched}
        />
      )}
    </div>
  );
}
