import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import NotFound from "./pages/NotFound/NotFound";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Loginpage from "./pages/LoginPage/Loginpage";
import DogModal from "./components/DogModal/DogModal";
import { useState } from "react";
import { Dog } from "./utils/interfaces";
import axios from "axios";

function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<Dog | undefined>(undefined);

  const getMatched = (favIds: string[]) => {
    axios
      .post("https://frontend-take-home-service.fetch.com/dogs/match", favIds, {
        withCredentials: true,
      })
      .then((res) => {
        let matchedDog: Dog;
        let matchId: string[] = [];
        let matchZipCode: string[] = [];

        matchId.push(res.data.match);

        axios
          .post("https://frontend-take-home-service.fetch.com/dogs", matchId, {
            withCredentials: true,
          })
          .then((idRes) => {
            matchedDog = idRes.data[0];
            matchZipCode.push(idRes.data[0].zip_code);

            axios
              .post(
                "https://frontend-take-home-service.fetch.com/locations",
                matchZipCode,
                {
                  withCredentials: true,
                }
              )
              .then((locRes) => {
                matchedDog.zip_code = `${locRes.data[0].city}, ${locRes.data[0].state}`;

                setModalData(matchedDog);
                setIsModalOpen(true);
              })
              .catch((err) => {
                console.error(
                  "There was an issue getting your matched dog location data. Here are the error notes:",
                  err
                );
              });
          })
          .catch((err) => {
            console.error(
              "There was an issue getting your matched dog details. Here are the error notes:",
              err
            );
          });
      })
      .catch((err) => {
        console.error(
          "There was an issue getting your matched dog id. Here are the error notes:",
          err
        );
      });
  };

  return (
    <div className="App">
      <Router>
        <Navbar />
        {isModalOpen && modalData !== undefined ? (
          <DogModal setIsModalOpen={setIsModalOpen} modalData={modalData} />
        ) : (
          <></>
        )}
        <Routes>
          <Route index path="/" element={<Loginpage />} />
          <Route
            path="/home"
            element={
              <Homepage
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                setModalData={setModalData}
                getMatched={getMatched}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
