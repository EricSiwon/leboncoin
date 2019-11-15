import React from "react";
import { useParams } from "react-router-dom";

const Offer = ({ contents }) => {
  const obj = useParams();
  //boucle pour rechercher article.
  return (
    <div className="contents">
      <div className="wrapper">
        <div className="product">
          <div className="product-1">
            <img src="" className="img-size-2" />
            <div className="product-1-1">
              <h4>{obj.id}</h4>
              <h5>8888888 €</h5>
              <div>Date vetbrzbrbrbrzbr</div>
            </div>
            <div>Description</div>
            <div>zflmchpru hpe ugehoej heo e</div>
          </div>
          <div className="product-2">
            <div>nom</div>
            <div>blablabla</div>
            <div>Acheter</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
