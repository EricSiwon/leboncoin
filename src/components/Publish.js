import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
// import Basic from "./Basic";

import "../Publish.css";

const Publish = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState("");

  const history = useHistory();

  const fetchPublish = async (data, header_http) => {
    let url = "http://localhost:4000/publish";
    try {
      const response = await axios.post(url, data, header_http);
      console.log("fetchPublish=>", response.data);
      history.push("/");
    } catch (error) {
      console.log("fetchPublish ERR", error.response);
      // alert(
      //   `Status :${error.response.status}\n Text :${error.response.statusText}\n Message:${error.response.data.error}`
      // );
    }
  };

  const setPublish = () => {
    const data = new FormData();
    data.append("title", title);
    data.append("description", message);
    data.append("price", price);
    data.append("picture", file);

    const token = Cookies.get("token");
    const header_http = { headers: { Authorization: "Bearer " + token } };

    fetchPublish(data, header_http);
  };

  return (
    <div className="modal3">
      <div className="search">
        <h3>Déposer une annonce</h3>
        <div>-------------------------------</div>
        <form
          onSubmit={e => {
            e.preventDefault();
            setPublish();
          }}
        >
          <h6>Titre de l'annonce *</h6>
          <input
            placeholder="Titre de l'annonce"
            type="text"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
            }}
          />
          <h6>Texte de l'annonce *</h6>
          <textarea
            placeholder="Texte de l'annonce"
            rows="5"
            cols="60"
            type="text"
            value={message}
            onChange={e => {
              setMessage(e.target.value);
            }}
          />
          <h6>Prix *</h6>
          <input
            placeholder="Prix"
            type="number"
            value={price}
            onChange={e => {
              setPrice(e.target.value);
            }}
          />
          {/* <Basic /> */}
          <h6>Photo *</h6>
          <input
            placeholder="Choisir une photo"
            type="file"
            onChange={e => {
              setFile(e.target.files[0]);
            }}
          />
          <br></br>
          <input type="submit" value="Valider" />
        </form>
      </div>
    </div>
  );
};
export default Publish;
