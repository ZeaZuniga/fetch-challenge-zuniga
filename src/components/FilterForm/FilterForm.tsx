import React, { useState } from "react";
import "./FilterForm.scss";
import { useForm } from "react-hook-form";
import Select from "react-select";
import filter from "../../assets/icons/filterLightGray.png";
import xLightGray from "../../assets/icons/xLightGray.png";
import { filterFormValues } from "../../utils/interfaces";

interface FormProps {
  breedArray: string[];
  searchFunction: (filters: filterFormValues) => void;
}

interface SortOptionTypes {
  readonly value: string;
  readonly label: string;
}

export default function FilterForm(props: FormProps) {
  const { register, handleSubmit, setValue } = useForm<filterFormValues>();
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const filterSubmit = (data: filterFormValues) => {
    if (typeof data.zipCodes === "string") {
      let zips: string[] = data.zipCodes.split(" ").map((code) => code.trim());

      let newData = {
        ...data,
        zipCodes: zips,
      };
      props.searchFunction(newData);
      setIsFormOpen(false);
      return;
    } else {
      props.searchFunction(data);
    }
  };

  const breedOptions = props.breedArray.map((breed) => ({
    value: breed,
    label: breed,
  }));

  const sortOptions: readonly SortOptionTypes[] = [
    { value: "breed:asc", label: "Breed A-Z" },
    { value: "breed:desc", label: "Breed Z-A" },
    { value: "age:asc", label: "Age Ascending" },
    { value: "age:desc", label: "Age Descending" },
    { value: "name:asc", label: "Name A-Z" },
    { value: "name:desc", label: "Name Z-A" },
  ];

  return (
    <form onSubmit={handleSubmit(filterSubmit)} className="filterform">
      <div
        className="filterform__tab"
        onClick={() => setIsFormOpen(!isFormOpen)}
      >
        {/* <img src={filter} alt="Filter Tab" className="filterform__img" /> */}
        <p className="filterform__header">Sort & Filter</p>
        <img
          src={xLightGray}
          alt="Close Filter"
          onClick={() => setIsFormOpen(false)}
          className={`filterform__close${
            isFormOpen
              ? " filterform__close--open"
              : " filterform__close--hidden"
          }`}
        />
      </div>
      <div
        className={`filterform__content${
          isFormOpen
            ? " filterform__content--open"
            : " filterform__content--hidden"
        }`}
      >
        <section className="filterform__container">
          <label className="filterform__label" htmlFor="sort">
            Select Sort
          </label>
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
            name="sort"
            options={sortOptions}
            defaultValue={sortOptions[0]}
            onChange={(e) => setValue("sort", e?.value)}
          />
        </section>
        <section className="filterform__container">
          <label className="filterform__label" htmlFor="breeds">
            Select Breeds
          </label>
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
            isMulti
            closeMenuOnSelect={false}
            closeMenuOnScroll={false}
            options={breedOptions}
            onChange={(e) =>
              setValue(
                "breeds",
                e.map(({ value }) => value)
              )
            }
          />
        </section>
        <section className="filterform__container filterform__container--age">
          <div className="filterform__ageDivider">
            <label
              htmlFor="ageMin"
              className="filterform__label filterform__label--age"
            >
              Minimum Age (in years)
            </label>
            <input
              {...register("ageMin")}
              type="number"
              name="ageMin"
              className="filterform__input filterform__input--age"
            />
          </div>

          <div className="filterform__ageDivider">
            <label
              htmlFor="ageMax"
              className="filterform__label filterform__label--age"
            >
              Maximum Age (in years)
            </label>
            <input
              {...register("ageMax")}
              type="number"
              name="ageMax"
              className="filterform__input filterform__input--age"
            />
          </div>
        </section>
        <section className="filterform__container">
          <label htmlFor="zipCodes" className="filterform__label">
            Zip Codes
          </label>
          <input
            {...register("zipCodes")}
            type="text"
            name="zipCodes"
            className="filterform__input"
          />
        </section>
        <input
          type="submit"
          value="Apply Filters"
          className="filterform__submit"
        />
      </div>
    </form>
  );
}
