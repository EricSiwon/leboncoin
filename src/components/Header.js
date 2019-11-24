import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/Logo.svg";
// import PlusSquare from "../components/PlusSquare";
import { AddBox } from "@material-ui/icons";

const Header = props => {
  console.log("Header=>", props);
  return (
    <header className="header">
      <div className="header-1">
        <div>
          <Link to="/">
            <img
              alt="logo"
              src={Logo}
              onClick={() => {
                props.setClickHome(true);
              }}
            />
          </Link>
        </div>
        <Link to="/publish">
          <div className="header-1-2">
            <AddBox />
            <span>Déposer une annonce</span>
          </div>
        </Link>

        <div className="header-1-3">
          <svg viewBox="0 0 24 24" width="28" height="28">
            <path d="M23.58 21.45l-7-7a9.42 9.42 0 001.62-6.87A9.13 9.13 0 0010.34.07a9.25 9.25 0 00-2.81 18.27 9.25 9.25 0 007-1.76l7 7a1.54 1.54 0 002.11 0 1.56 1.56 0 00-.06-2.13zM9.22 15.5a6.37 6.37 0 116.33-6.37 6.33 6.33 0 01-6.33 6.37z"></path>
          </svg>
          <Link to="/search">
            <span>Recherche</span>
          </Link>
        </div>
      </div>

      <div className="header-2">
        <div className="header-2-1">
          <svg
            data-name="Calque 1"
            viewBox="0 0 24 24"
            width="1em"
            height="1em"
          >
            <path d="M12 12a5.92 5.92 0 005.86-6A5.93 5.93 0 0012 0a5.93 5.93 0 00-5.86 6A5.92 5.92 0 0012 12zm0-9a3 3 0 11-2.93 3A3 3 0 0112 3zM22.46 22.13a10.68 10.68 0 00-10.46-8 10.68 10.68 0 00-10.46 8A1.5 1.5 0 002.61 24a1.46 1.46 0 001.78-1.08A7.72 7.72 0 0112 17.09a7.72 7.72 0 017.61 5.78A1.48 1.48 0 0021 24a1.12 1.12 0 00.36-.05 1.5 1.5 0 001.1-1.82z"></path>
          </svg>
          {props.user.token ? (
            <h5
              onClick={() => {
                props.logOut();
              }}
            >
              Se deconnecter [{props.username}]
            </h5>
          ) : (
            <h5
              onClick={() => {
                props.setShowModal(true);
              }}
            >
              Se connecter
            </h5>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
