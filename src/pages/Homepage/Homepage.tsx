import { useEffect, useState } from "react";
import "./Homepage.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const [resultsIds, setResultsIds] = useState<[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://frontend-take-home-service.fetch.com/dogs/search", {
        withCredentials: true,
      })
      .then((res) => {
        let newList = res.data.resultIds;
        setResultsIds(newList);
        // console.log(resultsIds);
      })
      .catch((error) => {
        console.error(error);
        navigate("/login");
      });
  }, []);

  useEffect(() => {
    console.log(resultsIds.length);

    if (resultsIds.length !== 0) {
      axios
        .post(
          "https://frontend-take-home-service.fetch.com/dogs",
          {
            body: resultsIds,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      return;
    }
  }, [resultsIds]);

  return (
    <div className="homepage">
      <h2>Homepage</h2>
    </div>
  );
}
