import React, { useEffect } from "react";
import "./FavDogs.scss";

export default function FavDogs(props: {
  favIds: string[];
  setFavIds: (newList: string[]) => void;
}) {
  return (
    <div className="favdogs">
      {props.favIds.map((entry, i) => (
        <p key={i}>{entry}</p>
      ))}
    </div>
  );
}
