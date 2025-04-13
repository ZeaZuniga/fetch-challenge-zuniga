import React, { MouseEventHandler, useEffect, useState } from "react";
import "./DogCard.scss";
import { Dog } from "../../utils/interfaces";
import heartEmpty from "../../assets/icons/heartEmptyPrimary.png";
import heartFull from "../../assets/icons/heartFullPrimary.png";

interface DogProps {
  dogData: Dog;
  favIds: string[];
  setFavIds: (newList: string[]) => void;
  setIsModalOpen: (value: boolean) => void;
  setModalData: (data: Dog) => void;
}

export default function DogCard(props: DogProps) {
  const [heartChecked, setHeartChecked] = useState<boolean>(false);

  useEffect(() => {
    if (props.favIds.includes(props.dogData.id)) {
      setHeartChecked(true);
    } else if (!props.favIds.includes(props.dogData.id)) {
      setHeartChecked(false);
    }
  }, [props.favIds, props.dogData.id]);

  const handleHeart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setHeartChecked(!heartChecked);

    let copyList: string[] = [];
    let discardList: string[] = [];

    if (props.favIds.includes(props.dogData.id)) {
      props.favIds.forEach((tag) => {
        if (tag !== props.dogData.id) {
          copyList.push(tag);
        } else if (tag === props.dogData.id) {
          discardList.push(tag);
        }
      });
      props.setFavIds(copyList);
    } else if (!props.favIds.includes(props.dogData.id)) {
      copyList = props.favIds;
      copyList.push(props.dogData.id);
      props.setFavIds([...copyList]);
    }
  };

  const handleModal = () => {
    props.setModalData(props.dogData);
    props.setIsModalOpen(true);
  };

  return (
    <li onClick={handleModal} className="dogCard">
      <div className="dogCard__container">
        <img
          src={props.dogData.img}
          alt={`${props.dogData.name}`}
          className="dogCard__img"
        />
      </div>
      <div className="dogCard__info">
        <section className="dogCard__info--top">
          <h3 className="dogCard__name">{props.dogData.name}</h3>
          <button className="dogCard__favorite" onClick={handleHeart}>
            <img
              className="dogCard__heart"
              src={heartChecked ? heartFull : heartEmpty}
              alt="Favorite Heart Icon"
            />
          </button>
        </section>
        <section className="dogCard__info--bottom">
          <p className="dogCard__breed">{props.dogData.breed}</p>
          <p className="dogCard__age">
            {props.dogData.age} year{props.dogData.age === 1 ? "" : "s"} old
          </p>
          <p className="dogCard__location">{props.dogData.zip_code}</p>
        </section>
      </div>
    </li>
  );
}
