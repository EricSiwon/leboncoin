import React from "react";
import { Link } from "react-router-dom";

const Offers = ({ id, title, price, created, pictures }) => {
  return (
    <div className="wrapper">
      <div className="wrapper">
        <Link to={"/offer/" + id} className="products">
          <div>
            <img className="img-size-1" src={pictures} alt="" />
          </div>
          <div>
            <div>{title}</div>
            <div>{price}€</div>
            <div>
              {new Date(created).toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
              })}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Offers;
