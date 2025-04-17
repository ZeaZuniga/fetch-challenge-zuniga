import axios from "axios";
import funcGetData from "./funcGetData";

const funcMatch = (favIds: string[]) => {
  axios
    .post("https://frontend-take-home-service.fetch.com/dogs/match", favIds, {
      withCredentials: true,
    })
    .then((matchIdRes) => {
      let matchId: string[] = [];
      matchId.push(matchIdRes.data.match);

      funcGetData(matchId).then((data) => console.log(data));
    })
    .catch((error) => {
      console.log("GetMatch error:", error);
    });
};

export default funcMatch;
