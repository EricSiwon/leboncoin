import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Register.css";
import { useHistory } from "react-router-dom";

const Register = props => {
  const [pseudo, setPseudo] = useState("");
  const [eMail, setEmail] = useState("");
  const [passWord1, setPassWord1] = useState("");
  const [passWord2, setPassWord2] = useState("");

  const history = useHistory();

  // const [showRegister, setRegister] = useState(false);

  const fetchRegister = async () => {
    console.log("fetchRegister 1");
    // {
    //   "email": "farid@lereacteur.io",
    //   "username": "Farid",
    //   "password": "azerty"
    // }
    let Url = " https://leboncoin-api.herokuapp.com/api/user/sign_up";
    try {
      const response = await axios.post(Url, {
        // username: pseudo,
        email: eMail,
        password: passWord1
      });
      //       account: {username: "esi"}
      // token: "TcvGRvSRphUNgFlWrstDhf1MecH7fEsSAEHntoS6zUwhdYvj2xfbyHL6U8yDlUHC"
      // _id: "5dd30b21e758340015c0616a"
      //       {data: {…}, status: 400, statusText: "Bad Request", headers: {…}, config: {…}, …}
      // config: {url: " https://leboncoin-api.herokuapp.com/api/user/sign_up", method: "post", data: "{"username":"esi","email":"e.s@g.c","password":"azer"}", headers: {…}, transformRequest: Array(1), …}
      // data: {error: "E11000 duplicate key error index: heroku_lpc4b6js.users.$account.username_1 dup key: { : "esi" }"}
      // headers: {content-length: "110", content-type: "application/json; charset=utf-8"}
      // request: XMLHttpRequest {readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, onreadystatechange: ƒ, …}
      // status: 400
      // statusText: "Bad Request"
      //   {
      //     "_id": "5b4cdf774f53952a5f849635",
      //     "token": "JI9OTHS6D1oRKrSX",
      //     "account": {
      //       "username": "Farid"
      //     }
      //   }
      console.log("Register", response.data);
      props.logIn(response.data);
      // setRegister(true);
      history.push("/");
    } catch (error) {
      console.log("catch",error);
      console.log("catch",error.response);
      alert(`Status :${error.response.status}\n Text :${error.response.statusText}\n Message:${error.response.data.error}`)
    }
  };

  return (
    <div className="modal2">
      <div className="register">
        <h3>Register</h3>
        <div>-------------------------------</div>
        <form
          onSubmit={event => {
            event.preventDefault();
            fetchRegister();
          }}
        >
          <h6>Pseudo</h6>
          <input
            placeholder="Pseudo"
            type="text"
            value={pseudo}
            onChange={event => {
              setPseudo(event.target.value);
            }}
          />
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
            value={passWord1}
            onChange={event => {
              setPassWord1(event.target.value);
            }}
          />
          <h6>Confirmer le mot de passe</h6>
          <input
            placeholder="Mot de passe"
            type="text"
            value={passWord2}
            onChange={event => {
              setPassWord2(event.target.value);
            }}
          />
          <br></br>
          <input type="submit" value="Creer mon compte personnel" />
        </form>
        <h4>
          <Link to={"/"}>
            <div
              className="login-button"
            >
              Cancel
            </div>
          </Link>
        </h4>
      </div>
    </div>
  );
};
export default Register;
