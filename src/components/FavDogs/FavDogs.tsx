import React, { useEffect, useState } from "react";
import "./FavDogs.scss";
import { Dog } from "../../utils/interfaces";
import axios from "axios";
import fullHeart from "../../assets/icons/heartEmptyDark.png";
import closeFav from "../../assets/icons/xPurple.png";
import FavCard from "../FavCard/FavCard";

export default function FavDogs(props: {
  favIds: string[];
  setFavIds: (newList: string[]) => void;
  getMatched: (favIds: string[]) => void;
}) {
  const [currentFavDogs, setCurrentFavDogs] = useState<Dog[]>([]);
  const [isFavListOpen, setIsFavListOpen] = useState<boolean>(false);

  useEffect(() => {
    axios
      .post("https://frontend-take-home-service.fetch.com/dogs", props.favIds, {
        withCredentials: true,
      })
      .then((res) => {
        setCurrentFavDogs(res.data);
      })
      .catch((error) => {
        alert(
          "There was an issue requesting Dog List data. Please try again later."
        );
        console.error(error);
      });
  }, [props.favIds]);

  const handleMatch = () => {
    props.getMatched(props.favIds);
    setIsFavListOpen(false);
  };

  return (
    <div
      className={
        isFavListOpen ? "favDogs favDogs--open" : "favDogs favDogs--hidden"
      }
    >
      <section
        className={
          isFavListOpen ? "favDogs__tab favDogs__tab--open" : "favDogs__tab"
        }
        onClick={() => setIsFavListOpen(!isFavListOpen)}
      >
        <p
          className={
            isFavListOpen
              ? "favDogs__number favDogs__number--open"
              : "favDogs__number"
          }
        >
          {currentFavDogs.length}
        </p>
        <img
          src={isFavListOpen ? closeFav : fullHeart}
          alt="Favorite Heart"
          className={
            isFavListOpen
              ? "favDogs__heart favDogs__heart--open"
              : "favDogs__heart"
          }
        />
      </section>
      {isFavListOpen && (
        <>
          <div className="favDogs__container">
            <p className="favDogs__count">{currentFavDogs.length}</p>
            <p className="favDogs__header">
              Liked Dog{currentFavDogs.length === 1 ? "" : "s"}
            </p>
          </div>
          <ul className="favDogs__list">
            {currentFavDogs.map((dogObject: Dog) => {
              return (
                <FavCard
                  image={dogObject.img}
                  name={dogObject.name}
                  setFavIds={props.setFavIds}
                  favIds={props.favIds}
                  currentId={dogObject.id}
                  key={dogObject.id}
                />
              );
            })}
          </ul>
          <button onClick={handleMatch} className="favDogs__match">
            Find Your Match
          </button>
        </>
      )}
    </div>
  );
}
