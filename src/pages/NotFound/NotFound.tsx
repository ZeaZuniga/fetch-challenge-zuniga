import { useNavigate } from "react-router-dom";
import "./NotFound.scss";
import { MouseEventHandler } from "react";

export default function NotFound() {
  const navigate = useNavigate();

  const handleNav: MouseEventHandler<HTMLButtonElement> = () => {
    navigate(-1);
    return;
  };

  return (
    <div className="notFound">
      <h2 className="notFound__header">
        This page is under indefinite construction as this is a fictional
        website. Thank you for your patience.
      </h2>
      <button onClick={handleNav} className="notFound__button">
        Click To Go Back
      </button>
    </div>
  );
}
