import React from "react";
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
        closeMenuOnSelect={false}
        closeMenuOnScroll={false}
        options={[
          { value: "Breed Asc", label: "Breed Ascending" },
          { value: "Breed Dsc", label: "Breed Descending" },
          { value: "Age Asc", label: "Age Ascending" },
          { value: "Age Dsc", label: "Age Descending" },
          { value: "Name Asc", label: "Name Ascending" },
          { value: "Name Dsc", label: "Name Descending" },
        ]}
        defaultInputValue={props.sortState}
        onChange={(value) => {
          console.log(value);
        }}
      />
      {/* <select name="sortResultsSelect" id="sortResultsSelect"></select> */}
    </div>
  );
}
