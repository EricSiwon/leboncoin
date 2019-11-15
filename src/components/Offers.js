import React from "react";
import { Link } from "react-router-dom";

const Offers = ({ id, title, price, created, pictures }) => {
  return (
    <div className="wrapper">
      <div className="wrapper">
        <Link to={"/offer/" + id} className="products" >
          <div>
            <img className="img-size-1" src={pictures} alt="" />
          </div>
          <div>
            <div>{title}</div>
            <div>{price}€</div>
            <div>{created} </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Offers;
