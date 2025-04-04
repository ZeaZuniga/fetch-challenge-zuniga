import React from "react";
import "./FavCard.scss";
import remove from "../../assets/icons/xLightGray.png";

export default function FavCard(props: { image: string; name: string }) {
  return (
    <li className="favCard">
      <div className="favCard__container">
        <img src={props.image} alt={props.name} className="favCard__img" />
      </div>
      <p className="favCard__name">{props.name}</p>
      <button className="favCard__remove">
        <img src={remove} alt="Remove Favorite" className="favCard__x" />
      </button>
    </li>
  );
}
