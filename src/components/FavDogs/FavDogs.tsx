import React, { useEffect, useState } from "react";
import "./FavDogs.scss";
import { Dog } from "../../utils/interfaces";
import axios from "axios";

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
          ? "favdogs favdogs--open"
          : "favdogs favdogs--hidden"
      }
    >
      <section
        className="favdogs__tab"
        onClick={() => setIsFavListOpen(!isFavListOpen)}
      >
        <p className="favdogs__number">{currentFavDogs.length}</p>
        <p className="favdogs__header">
          Liked Dog{currentFavDogs.length === 1 ? "" : "s"}
        </p>
      </section>
      {isFavListOpen && (
        <ul className="favdogs__list">
          {currentFavDogs.map((dogObject: Dog, i: number) => {
            return (
              <li className="favdogs__dog" key={i}>
                <img
                  src={dogObject.img}
                  alt={dogObject.name}
                  className="favDog__img"
                />
                <p className="favDog__name">{dogObject.name}</p>
                <button className="favdogs__remove">x</button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
