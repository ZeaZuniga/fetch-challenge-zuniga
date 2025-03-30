import React, { useState } from "react";
import "./DogCard.scss";
import { Dog } from "../../utils/interfaces";
import heartEmpty from "../../assets/icons/heartEmpty.png";
import heartFull from "../../assets/icons/heartFull.png";

interface DogProps {
  dogData?: Dog;
}

export default function DogCard({ dogData }: DogProps) {
  const [heartChecked, setHeartChecked] = useState<boolean>(false);

  const handleHeart = () => {
    setHeartChecked(!heartChecked);
  };

  return (
    <li className="dogCard">
      <button className="dogCard__favorite" onClick={handleHeart}>
        <img
          className="dogCard__heart"
          src={heartChecked ? heartFull : heartEmpty}
          alt="Favorite Heart Icon"
        />
      </button>
      <div className="dogCard__container">
        <img
          src={dogData?.img}
          alt={`Photo of ${dogData?.name}`}
          className="dogCard__img"
        />
      </div>
      <div className="dogCard__info">
        <h3 className="dogCard__name">{dogData?.name}</h3>
        <section className="dogCard__info--right">
          <p className="dogCard__breed">{dogData?.breed}</p>
          <p className="dogCard__age">
            {dogData?.age} year{dogData?.age === 1 ? "" : "s"} old
          </p>
        </section>
      </div>
    </li>
  );
}
