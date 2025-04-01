import React from "react";
import "./FilterForm.scss";
import { useForm } from "react-hook-form";
import Select from "react-select";

interface filterFormValues {
  breeds?: string[];
  zipCodes?: string | string[];
  ageMin?: string;
  ageMax?: string;
}

const breedArray = [
  "Affenpinscher",
  "Afghan Hound",
  "African Hunting Dog",
  "Airedale",
  "American Staffordshire Terrier",
  "Appenzeller",
  "Australian Terrier",
  "Basenji",
  "Basset",
  "Beagle",
  "Bedlington Terrier",
  "Bernese Mountain Dog",
  "Black-and-tan Coonhound",
  "Blenheim Spaniel",
  "Bloodhound",
  "Bluetick",
  "Border Collie",
  "Border Terrier",
  "Borzoi",
  "Boston Bull",
  "Bouvier Des Flandres",
  "Boxer",
  "Brabancon Griffon",
  "Briard",
  "Brittany Spaniel",
  "Bull Mastiff",
  "Cairn",
  "Cardigan",
  "Chesapeake Bay Retriever",
  "Chihuahua",
  "Chow",
  "Clumber",
  "Cocker Spaniel",
  "Collie",
  "Curly-coated Retriever",
  "Dandie Dinmont",
  "Dhole",
  "Dingo",
  "Doberman",
  "English Foxhound",
  "English Setter",
  "English Springer",
  "EntleBucher",
  "Eskimo Dog",
  "Flat-coated Retriever",
  "French Bulldog",
  "German Shepherd",
  "German Short-haired Pointer",
  "Giant Schnauzer",
  "Golden Retriever",
  "Gordon Setter",
  "Great Dane",
  "Great Pyrenees",
  "Greater Swiss Mountain Dog",
  "Groenendael",
  "Ibizan Hound",
  "Irish Setter",
  "Irish Terrier",
  "Irish Water Spaniel",
  "Irish Wolfhound",
  "Italian Greyhound",
  "Japanese Spaniel",
  "Keeshond",
  "Kelpie",
  "Kerry Blue Terrier",
  "Komondor",
  "Kuvasz",
  "Labrador Retriever",
  "Lakeland Terrier",
  "Leonberg",
  "Lhasa",
  "Malamute",
  "Malinois",
  "Maltese Dog",
  "Mexican Hairless",
  "Miniature Pinscher",
  "Miniature Poodle",
  "Miniature Schnauzer",
  "Newfoundland",
  "Norfolk Terrier",
  "Norwegian Elkhound",
  "Norwich Terrier",
  "Old English Sheepdog",
  "Otterhound",
  "Papillon",
  "Pekinese",
  "Pembroke",
  "Pomeranian",
  "Pug",
  "Redbone",
  "Rhodesian Ridgeback",
  "Rottweiler",
  "Saint Bernard",
  "Saluki",
  "Samoyed",
  "Schipperke",
  "Scotch Terrier",
  "Scottish Deerhound",
  "Sealyham Terrier",
  "Shetland Sheepdog",
  "Shih-Tzu",
  "Siberian Husky",
  "Silky Terrier",
  "Soft-coated Wheaten Terrier",
  "Staffordshire Bullterrier",
  "Standard Poodle",
  "Standard Schnauzer",
  "Sussex Spaniel",
  "Tibetan Mastiff",
  "Tibetan Terrier",
  "Toy Poodle",
  "Toy Terrier",
  "Vizsla",
  "Walker Hound",
  "Weimaraner",
  "Welsh Springer Spaniel",
  "West Highland White Terrier",
  "Whippet",
  "Wire-haired Fox Terrier",
  "Yorkshire Terrier",
];

export default function FilterForm() {
  const { register, handleSubmit, setValue } = useForm<filterFormValues>();

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

  const breedOptions = breedArray.map((breed) => ({
    value: breed,
    label: breed,
  }));

  return (
    <form onSubmit={handleSubmit(filterSubmit)} className="filterform">
      <div className="filterForm__container">
        <Select
          className="filterForm__select"
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
      </div>
      <div className="filterForm__container">
        <label htmlFor="ageMin" className="filterForm__label">
          Minimum Age (in years)
        </label>
        <input
          {...register("ageMin")}
          type="number"
          name="ageMin"
          className="filterForm__input"
        />
      </div>
      <div className="filterForm__container">
        <label htmlFor="ageMax" className="filterForm__label">
          Maximum Age (in years)
        </label>
        <input
          {...register("ageMax")}
          type="number"
          name="ageMax"
          className="filterForm__input"
        />
      </div>
      <div className="filterForm__container">
        <label htmlFor="zipCodes" className="filterForm__label">
          Zip Codes (separated by comma)
        </label>
        <input
          {...register("zipCodes")}
          type="text"
          name="zipCodes"
          className="filterForm__input"
        />
      </div>
      <input
        type="submit"
        value="Apply Filters"
        className="filterForm__submit"
      />
    </form>
  );
}
