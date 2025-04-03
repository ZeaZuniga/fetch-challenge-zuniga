import React, { useEffect } from "react";
import "./SortResults.scss";
import { Dog } from "../../utils/interfaces";
import Select from "react-select";

interface SortProps {
  resultsList: Dog[];
  setResultsList: (sortedList: Dog[]) => void;
  sortState:
    | "Breed Asc"
    | "Breed Dsc"
    | "Age Asc"
    | "Age Dsc"
    | "Name Asc"
    | "Name Dsc";
  setSortState: (
    sortOrder:
      | "Breed Asc"
      | "Breed Dsc"
      | "Age Asc"
      | "Age Dsc"
      | "Name Asc"
      | "Name Dsc"
  ) => void;
}

export default function SortResults(props: SortProps) {
  useEffect(() => {
    let sortedArray: Dog[] = props.resultsList;

    if (props.sortState === "Breed Asc") {
      sortedArray.sort((a: Dog, b: Dog) => {
        return a.breed > b.breed ? 1 : -1;
      });
    } else if (props.sortState === "Breed Dsc") {
      sortedArray.sort((a: Dog, b: Dog) => {
        return b.breed > a.breed ? 1 : -1;
      });
    } else if (props.sortState === "Age Asc") {
      sortedArray.sort((a: Dog, b: Dog) => {
        return a.age > b.age ? 1 : -1;
      });
    } else if (props.sortState === "Age Dsc") {
      sortedArray.sort((a: Dog, b: Dog) => {
        return b.age > a.age ? 1 : -1;
      });
    } else if (props.sortState === "Name Asc") {
      sortedArray.sort((a: Dog, b: Dog) => {
        return a.name > b.name ? 1 : -1;
      });
    } else if (props.sortState === "Name Dsc") {
      sortedArray.sort((a: Dog, b: Dog) => {
        return b.name > a.name ? 1 : -1;
      });
    }
  }, [props.sortState]);

  return (
    <div className="sortResults">
      <Select
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? "#ffa900" : "#890075",
            borderRadius: "8px",
            borderWidth: "2px",
            boxShadow: "none",
          }),
          menuList: (styles) => ({
            ...styles,
            background: "white",
            borderRadius: "12px",
          }),
          option: (styles) => ({
            ...styles,
            color: "#300d38",
          }),
          menu: (base) => ({
            ...base,
            zIndex: 1,
            margin: 0,
          }),
        }}
        name="breeds"
        placeholder="Sort by..."
        options={[
          { value: "Breed Asc", label: "Breed A-Z" },
          { value: "Breed Dsc", label: "Breed Z-A" },
          { value: "Age Asc", label: "Age Ascending" },
          { value: "Age Dsc", label: "Age Descending" },
          { value: "Name Asc", label: "Name A-Z" },
          { value: "Name Dsc", label: "Name Z-A" },
        ]}
        onChange={(value) => {
          props.setSortState(
            value?.value as
              | "Breed Asc"
              | "Breed Dsc"
              | "Age Asc"
              | "Age Dsc"
              | "Name Asc"
              | "Name Dsc"
          );
        }}
      />
    </div>
  );
}
