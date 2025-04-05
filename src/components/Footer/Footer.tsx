import "./Footer.scss";
import pawPrint from "../../assets/icons/pawPrintColor.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <section className="footer__logo">
        <img
          className="footer__img"
          src={pawPrint}
          alt="The Here Boy Logo: A Dog's Paw Print"
        />
        <p className="footer__title">Here Boy</p>
        <p className="footer__copywrite">
          ©2025 Zuniga Web Development, No rights reserved
        </p>
      </section>
      <section className="footer__lists">
        <div className="footer__container">
          <h3 className="footer__header">Quick Links</h3>
          <ul className="footer__list">
            <li className="footer__link">
              <Link to={"/home"}>Home</Link>
            </li>
            <li className="footer__link">
              <Link to={"/about"}>About</Link>
            </li>
            <li className="footer__link">
              <Link to={"/contact"}>Contact</Link>
            </li>
            <li className="footer__link">
              <Link to={"/resources"}>Resources</Link>
            </li>
          </ul>
        </div>
        <div className="footer__container">
          <h3 className="footer__header">Resources</h3>
          <ul className="footer__list">
            <li className="footer__link">How to be a Dog Owner</li>
            <li className="footer__link">What is a dog?</li>
            <li className="footer__link">Dog Instructions</li>
            <li className="footer__link">
              Dog Instructions (translated for dogs)
            </li>
          </ul>
        </div>
        <div className="footer__container">
          <h3 className="footer__header">Company</h3>
          <ul className="footer__list">
            <li className="footer__link">
              <Link to={"/about"}>About</Link>
            </li>
            <li className="footer__link">
              <Link to={"/support"}>Contact Support</Link>
            </li>
            <li className="footer__link">
              <Link to={"/careers"}>Careers</Link>
            </li>
            <li className="footer__link">
              <Link to={"/faq"}>Frequently Asked Questions</Link>
            </li>
          </ul>
        </div>
      </section>
      <section className="footer__disclosure">
        <h2 className="footer__disclaim-head">Disclaimer</h2>
        <p className="footer__disclaim-text">
          This React SPA was created by Zealtiel Zuniga for the submission of a
          coding challenge to demonstrate my skill and work style for a given
          task. To see the code behind this, visit{" "}
          <a href="https://github.com/ZeaZuniga/fetch-challenge-zuniga">
            this GitHub Link
          </a>{" "}
          to see the public code.
        </p>
        <p className="footer__disclaim-text">
          HereBoy is not a trademarked brand and is a fabrication for the
          purpose of this coding challenge.
        </p>
      </section>
    </div>
  );
}
