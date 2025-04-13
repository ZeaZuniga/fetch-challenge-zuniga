import React from "react";
import "./FavCard.scss";
import remove from "../../assets/icons/xLightGray.png";

export default function FavCard(props: {
  image: string;
  name: string;
  setFavIds: (newList: string[]) => void;
  favIds: string[];
  currentId: string;
}) {
  const handleRemove = () => {
    let copyList: string[] = [];
    let discardList: string[] = [];

    if (props.favIds.includes(props.currentId)) {
      props.favIds.forEach((tag) => {
        if (tag !== props.currentId) {
          copyList.push(tag);
        } else if (tag === props.currentId) {
          discardList.push(tag);
        }
      });
      props.setFavIds(copyList);
    } else if (!props.favIds.includes(props.currentId)) {
      copyList = props.favIds;
      copyList.push(props.currentId);
      props.setFavIds([...copyList]);
    }
  };

  return (
    <li className="favCard">
      <div className="favCard__container">
        <img src={props.image} alt={props.name} className="favCard__img" />
      </div>
      <p className="favCard__name">{props.name}</p>
      <button className="favCard__remove" onClick={handleRemove}>
        <img src={remove} alt="Remove Favorite" className="favCard__x" />
      </button>
    </li>
  );
}
