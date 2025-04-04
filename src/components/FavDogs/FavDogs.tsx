import React, { useEffect, useState } from "react";
import "./FavDogs.scss";
import { Dog } from "../../utils/interfaces";
import axios from "axios";
import fullHeart from "../../assets/icons/heartEmptyDark.png";
import closeFav from "../../assets/icons/xPurple.png";

export default function FavDogs(props: {
  favIds: string[];
  setFavIds: (newList: string[]) => void;
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

  return (
    <div
      className={
        currentFavDogs.length > 0
          ? "favDogs favDogs--open"
          : "favDogs favDogs--hidden"
      }
    >
      <section
        className="favDogs__tab"
        onClick={() => setIsFavListOpen(!isFavListOpen)}
      >
        <p className="favDogs__number">{currentFavDogs.length}</p>
        <img
          src={isFavListOpen ? closeFav : fullHeart}
          alt="Favorite Heart"
          className="favDogs__heart"
        />
      </section>
      {isFavListOpen && (
        <>
          <p className="favDogs__header">
            Liked Dog{currentFavDogs.length === 1 ? "" : "s"}
          </p>
          <ul className="favDogs__list">
            {currentFavDogs.map((dogObject: Dog, i: number) => {
              return (
                <li className="favDogs__dog" key={i}>
                  <img
                    src={dogObject.img}
                    alt={dogObject.name}
                    className="favDog__img"
                  />
                  <p className="favDog__name">{dogObject.name}</p>
                  <button className="favDogs__remove">x</button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
