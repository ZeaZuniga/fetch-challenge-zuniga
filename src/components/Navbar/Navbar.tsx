import axios from "axios";
import "./Navbar.scss";
import pawPrint from "../../assets/icons/pawPrintColor.png";
import { useState } from "react";
import openMenu from "../../assets/icons/menuPurple.png";
import closeMenu from "../../assets/icons/xPurple.png";
import { Link, NavLink, useNavigate } from "react-router-dom";

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
      .then(() => {
        console.log("User Is Logged out");
        closeNav();
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        closeNav();
        alert("There was an error logging you out. Navigating to Login Page.");
        navigate("/");
      });
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <div className="navbar">
      <Link to={"/home"} onClick={closeNav} className="navbar__logo">
        <img
          className="navbar__img"
          src={pawPrint}
          alt="The Here Boy Logo: A Dog's Paw Print"
        />
        <p className="navbar__title">Here Boy</p>
      </Link>
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
          <NavLink onClick={closeNav} to={"/home"}>
            Home
          </NavLink>
        </li>
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
