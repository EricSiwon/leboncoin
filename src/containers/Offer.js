import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Offer = () => {
  let { id } = useParams();
  console.log("Offer 1:", id);
  const [content, setContent] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOffer = async () => {
      console.log("Start fetchCOffer :", id);
      let Url = "https://leboncoin-api.herokuapp.com/api/offer/" + id;
      try {
        const response = await axios.get(Url);
        setContent(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchOffer();
  }, [id]);

  if (isLoading === false) {
    // if (content === "") {
    console.log(
      "Offer 2",
      // isLoading,
      id,
      content,
      content.pictures[0],
      content.creator.account.username
    );

    return (
      <div className="contents">
        <div className="wrapper">
          <div className="product">
            <div className="product-1">
              <img src={content.pictures[0]} alt="" className="img-size-2" />
              <div className="product-1-1">
                <h4>{content.title}</h4>
                <h5>{content.price} €</h5>
                <div>
                  {new Date(content.created).toLocaleDateString("fr-FR", {
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
              <div>Description</div>
              <div>{content.description}</div>
            </div>
            <div className="product-2">
              <div>{content.creator.account.username}</div>
              <div>blablabla</div>
              <div>Acheter</div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Offer;
