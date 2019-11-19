import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../Search.css";

const Search = props => {
  // console.log("Search",props)
  const [title, setTitle] = useState("");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);
  const history = useHistory();

  const fetchSearch = async searchParams => {
    console.log("fetchSearch", searchParams);
    let url =
      "https://leboncoin-api.herokuapp.com/api/offer/with-count" + searchParams;
    console.log("fetchSearch", url);
    try {
      const response = await axios.get(url);
      console.log("fetchSearch", response.data);
      props.setContents(response.data.offers);
      props.setCount(response.data.count);
      history.push("/");
    } catch (error) {
      console.log("catch", error);
      console.log("catch", error.response);
      alert(
        `Status :${error.response.status}\n Text :${error.response.statusText}\n Message:${error.response.data.error}`
      );
    }
  };

  const setSearch = () => {
    let searchParams = "";
    let add = false;
    if (title !== "") {
      if (add === false) {
        add = true;
        searchParams = searchParams + "?title=" + title;
      } else {
        searchParams = searchParams + "&title=" + title;
      }
    }
    if (priceMin !== 0) {
      if (add === false) {
        add = true;
        searchParams = searchParams + "?priceMin=" + priceMin;
      } else {
        searchParams = searchParams + "&priceMin=" + priceMin;
      }
    }
    if (priceMax !== 0) {
      if (add === false) {
        add = true;
        searchParams = searchParams + "?priceMax=" + priceMax;
      } else {
        searchParams = searchParams + "&priceMax=" + priceMax;
      }
    }
    console.log("setSearch", searchParams);
    fetchSearch(searchParams);
  };

  return (
    <div className="modal3">
      <div className="search">
        <h3>Recherche</h3>
        <div>-------------------------------</div>
        <form
          onSubmit={e => {
            e.preventDefault();
            setSearch();
          }}
        >
          <h6>Titre</h6>
          <input
            placeholder="Titre"
            type="text"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
            }}
          />
          <h6>Prix Mini</h6>
          <input
            placeholder="Prix Mini"
            type="number"
            value={priceMin}
            onChange={e => {
              setPriceMin(e.target.value);
            }}
          />
          <h6>Prix Maxi</h6>
          <input
            placeholder="Prix Maxi"
            type="number"
            value={priceMax}
            onChange={e => {
              setPriceMax(e.target.value);
            }}
          />
          <br></br>
          <input type="submit" value="Recherche" />
        </form>
      </div>
    </div>
  );
};

export default Search;
