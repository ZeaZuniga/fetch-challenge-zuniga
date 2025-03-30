import axios from "axios";
import "./Navbar.scss";
import pawPrint from "../../assets/icons/pawPrintColor.png";
import { useState } from "react";
import openMenu from "../../assets/icons/menuPurple.png";
import closeMenu from "../../assets/icons/xPurple.png";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleLogOut = () => {
    axios
      .post(
        "https://frontend-take-home-service.fetch.com/auth/logout",
        {},
        {
          withCredentials: true,
        }
      )
      .then((data) => {
        alert("You have logged out!");
        console.log("User Is Logged out", data);
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
        alert("There was an error logging you out.");
      });
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <div className="navbar">
      <section className="navbar__logo">
        <img
          className="navbar__img"
          src={pawPrint}
          alt="The Here Boy Logo: A Dog's Paw Print"
        />
        <p className="navbar__title">Here Boy</p>
      </section>
      <button
        onClick={() => {
          setIsNavOpen(!isNavOpen);
        }}
        className="navbar__container"
      >
        <img
          src={isNavOpen ? closeMenu : openMenu}
          alt={isNavOpen ? "Close Menu Button" : "Open Menu Button"}
          className="navbar__menuIcon"
        />
      </button>
      <ul
        className={`navbar__list${
          isNavOpen ? " navbar__list--open" : " navbar__list--hidden"
        }`}
      >
        <li className="navbar__item">
          <NavLink onClick={closeNav} to={"/about"}>
            About
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink onClick={closeNav} to={"/contact"}>
            Contact
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink onClick={closeNav} to={"/resources"}>
            Resources
          </NavLink>
        </li>
        <li className="navbar__item">
          <button onClick={handleLogOut} className="navbar__button">
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );
}
