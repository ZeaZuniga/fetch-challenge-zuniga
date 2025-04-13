import React from "react";
import "./DogModal.scss";
import { Dog } from "../../utils/interfaces";

export default function DogModal(props: {
  setIsModalOpen: (value: boolean) => void;
  modalData: Dog;
}) {
  const adjectives: string[] = [
    "a beautiful",
    "an intelligent",
    "an affectionate",
    "a friendly",
    "a loyal",
    "a playful",
    "the best",
    "a brave",
    "a calm",
    "a gentle",
    "an active",
    "a clumsy",
    "a regal",
    "a curious",
    "an energetic",
    "a goofy",
    "an obedient",
    "an adventurous",
    "a delightful",
    "a loving",
  ];
  const actions: string[] = [
    "to play hide and seek",
    "to hide their toys for you to find",
    "to splash in water",
    "to cuddle in bed",
    "to play fetch",
    "to be a couch potato",
    "to watch tv",
    'to jump on and over anything while yelling, "BARKOUR!"',
    "to run around in circles",
    "to sing along with your music",
    "to sleep",
    "to play with children",
    "to go on car rides",
    "to pretend they are a cat",
    "to do your taxes",
    "to dig holes at the beach",
    "to skateboard around the neighborhood",
    "to practice their interior design skills (move toys and furniture around)",
    "to go on moon-lit walks on the beach",
    "to comfort people",
    "to play dress up",
    "to play the drums",
    "to ride a bike",
    "to talk back at birds",
    "to be a statue",
    "to stare at walls",
    "neverending pets",
    "belly rubs",
    "chicken",
    "waffles",
    "bath time",
    "to swim",
    "to chase squirrles",
    "to ponder the meaning of life",
    "to play MineCraft",
    "to eat pizza",
    "to humbly request leftover scraps from dinner",
    "to build computers",
    "to find the Holy Grail",
    "to intimidate your local mailman",
  ];

  const getRandomInt = (min: number, max: number) => {
    const minCeiled = Math.ceil(0);
    const maxFloored = Math.floor(21);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  };

  return (
    <div onClick={() => props.setIsModalOpen(false)} className="dogModal">
      <section className="dogModal__card">
        <img
          src={props.modalData.img}
          alt={props.modalData.name}
          className="dogModal__img"
        />
        <div className="dogModal__info">
          <h1 className="dogModal__name">{props.modalData.name}</h1>
          <p className="dogModal__text">
            {props.modalData.name} is {adjectives[getRandomInt(0, 21)]}{" "}
            {props.modalData.age} year-old {props.modalData.breed} from{" "}
            {props.modalData.zip_code}.
          </p>
          <p className="dogModal__text">
            {props.modalData.name} loves {actions[getRandomInt(0, 41)]} and{" "}
            {actions[getRandomInt(0, 41)]}.
          </p>
        </div>
      </section>
    </div>
  );
}
