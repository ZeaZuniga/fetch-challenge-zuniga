import React from "react";
import "./FilterForm.scss";
import { useForm } from "react-hook-form";

interface filterFormValues {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
}

export default function FilterForm() {
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

  const { register, handleSubmit } = useForm<filterFormValues>();

  const filterSubmit = (data: Object) => {
    console.log("The form was submitted!", data);
  };

  return (
    <div className="filterform">
      <section className="filterform__button"></section>
      <form onSubmit={handleSubmit(filterSubmit)} className="filterform__form">
        <select
          {...register("breeds")}
          name="dogBreed"
          id="dogBreed"
          multiple
          size={8}
        >
          {breedArray.map((breed: string, i: number) => {
            return (
              <option value={breed} key={i}>
                {breed}
              </option>
            );
          })}
        </select>
        <label htmlFor="dogMin">Minimum Age</label>
        <input
          {...register("ageMin")}
          type="number"
          name="dogMin"
          id="dogMin"
        />
        <label htmlFor="dogMax">Maximum Age</label>
        <input
          {...register("ageMax")}
          type="number"
          name="dogMax"
          id="dogMax"
        />
        <input type="submit" value="Apply Filters" />
      </form>
    </div>
  );
}
