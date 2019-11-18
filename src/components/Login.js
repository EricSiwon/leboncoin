import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Login.css";

const ModalLogin = props => {
  const [eMail, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const fetchLoginUser = async () => {
    console.log("fetchLoginUser 1");
    // {
    //     "email": "farid@lereacteur.io",
    //     "password": "azerty"
    //   }
    let Url = "https://leboncoin-api.herokuapp.com/api/user/log_in";
    try {
      const response = await axios.post(Url, {
        email: eMail,
        password: passWord
      });
      //   {
      //     "_id": "5b4cdf774f53952a5f849635",
      //     "token": "JI9OTHS6D1oRKrSX",
      //     "account": {
      //       "username": "Farid"
      //     }
      //   }
      console.log("Login", response.data);
      props.logIn(response.data);
      props.setShowModal(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="login">
      <h3>Connexion</h3>
      <div>-------------------------------</div>
      <form
        onSubmit={event => {
          event.preventDefault();
          fetchLoginUser();
        }}
      >
        <h6>Adress email</h6>
        <input
          placeholder="Email address"
          type="mail"
          value={eMail}
          onChange={event => {
            setEmail(event.target.value);
          }}
        />
        <h6>Mot de passe</h6>
        <input
          placeholder="Mot de passe"
          type="text"
          value={passWord}
          onChange={event => {
            setPassWord(event.target.value);
          }}
        />
        <input type="submit" value="Se connecter" />
      </form>
      <h4>
        <strong>Vous n'avez pas de compte</strong>
        <div className="login-button">Creer un compte</div>
        <div
          className="login-button"
          onClick={() => {
            props.setShowModal(false);
          }}
        >
          Cancel
        </div>
      </h4>
    </div>
  );
};

export default ModalLogin;
