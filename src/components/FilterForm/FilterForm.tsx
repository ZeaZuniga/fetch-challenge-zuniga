import React, { useState } from "react";
import "./FilterForm.scss";
import { useForm } from "react-hook-form";
import Select from "react-select";
import filter from "../../assets/icons/filterLightGray.png";
import xLightGray from "../../assets/icons/xLightGray.png";

interface filterFormValues {
  breeds?: string[];
  zipCodes?: string | string[];
  ageMin?: string;
  ageMax?: string;
}

export default function FilterForm(props: { breedArray: string[] }) {
  const { register, handleSubmit, setValue } = useForm<filterFormValues>();
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const filterSubmit = (data: filterFormValues) => {
    if (typeof data.zipCodes === "string") {
      let zips: string[] = data.zipCodes.split(",").map((code) => code.trim());

      let newData = {
        ...data,
        zipCodes: zips,
      };
      console.log(newData);
      return;
    } else {
      console.log(data);
    }
  };

  const breedOptions = props.breedArray.map((breed) => ({
    value: breed,
    label: breed,
  }));

  return (
    <form onSubmit={handleSubmit(filterSubmit)} className="filterform">
      <div
        className="filterform__tab"
        onClick={() => setIsFormOpen(!isFormOpen)}
      >
        <img src={filter} alt="Filter Tab" className="filterform__img" />
        <p className="filterform__header">Filters</p>
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
          <label htmlFor="breeds">Select Breeds</label>
          <Select
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? "#ffa900" : "#890075",
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
        <section className="filterform__container">
          <label htmlFor="ageMin" className="filterForm__label">
            Minimum Age (in years)
          </label>
          <input
            {...register("ageMin")}
            type="number"
            name="ageMin"
            className="filterForm__input"
          />
        </section>
        <section className="filterform__container">
          <label htmlFor="ageMax" className="filterForm__label">
            Maximum Age (in years)
          </label>
          <input
            {...register("ageMax")}
            type="number"
            name="ageMax"
            className="filterForm__input"
          />
        </section>
        <section className="filterform__container">
          <label htmlFor="zipCodes" className="filterForm__label">
            Zip Codes (separated by comma)
          </label>
          <input
            {...register("zipCodes")}
            type="text"
            name="zipCodes"
            className="filterForm__input"
          />
        </section>
        <input
          type="submit"
          value="Apply Filters"
          className="filterForm__submit"
        />
      </div>
    </form>
  );
}
