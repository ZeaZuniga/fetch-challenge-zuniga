import React from "react";
import "./FavDogs.scss";

export default function FavDogs(props: {
  list?: string[];
  editList: (newList: string[]) => void;
}) {
  return (
    <div className="favdogs">
      {props.list?.map((entry) => (
        <p>entry</p>
      ))}
    </div>
  );
}
