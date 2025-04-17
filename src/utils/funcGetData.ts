import axios from "axios";
import { Dog } from "./interfaces";

const funcGetData = async (idArray: string[]) => {
  try {
    const idRes = await axios.post(
      "https://frontend-take-home-service.fetch.com/dogs",
      idArray,
      {
        withCredentials: true,
      }
    );

    let dogDataZipCodes: string[] = [];
    let editedDogs: Dog[] = [];

    idRes.data.forEach((entry: Dog) => {
      dogDataZipCodes.push(entry.zip_code);
    });

    axios
      .post(
        "https://frontend-take-home-service.fetch.com/locations",
        dogDataZipCodes,
        {
          withCredentials: true,
        }
      )
      .then((locRes) => {
        idRes.data.forEach((entry: Dog, i: number) => {
          if (locRes.data[i] !== null) {
            entry.zip_code = `${locRes.data[i].city}, ${locRes.data[i].state}`;
          }
          editedDogs.push(entry);
        });
      })
      .catch((locErr) => {
        console.log(locErr);
      });

    return editedDogs;
  } catch (error) {
    console.log("There was a problem getting data:", error);
  }

  // return axios
  //   .post("https://frontend-take-home-service.fetch.com/dogs", idArray, {
  //     withCredentials: true,
  //   })
  //   .then((idRes) => {
  //     let dogDataZipCodes: string[] = [];
  //     let editedDogs: Dog[] = [];

  //     idRes.data.forEach((entry: Dog) => {
  //       dogDataZipCodes.push(entry.zip_code);
  //     });

  //     // axios
  //     //   .post(
  //     //     "https://frontend-take-home-service.fetch.com/locations",
  //     //     dogDataZipCodes,
  //     //     {
  //     //       withCredentials: true,
  //     //     }
  //     //   )
  //     //   .then((locRes) => {
  //     //     idRes.data.forEach((entry: Dog, i: number) => {
  //     //       if (locRes.data[i] !== null) {
  //     //         entry.zip_code = `${locRes.data[i].city}, ${locRes.data[i].state}`;
  //     //       }
  //     //       editedDogs.push(entry);
  //     //     });
  //     //   })
  //     //   .catch((locErr) => {
  //     //     console.log(locErr);
  //     //   });

  //     // return editedDogs;

  //     return dogDataZipCodes;
  //   })
  //   .catch((error) => {
  //     console.log("GetData error:", error);
  //   });
};

export default funcGetData;
