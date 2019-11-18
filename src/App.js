import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
//
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import ModalLogin from "./components/Login";
//
import Home from "./containers/Home";
import Offer from "./containers/Offer";
//
import "./App.css";
//
function App() {
  // Chargement
  const [contents, setContents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  // Gestion Utilisateur
  const userCookie = Cookies.get("user");
  console.log("App:userCookie=>", userCookie);

  const [user, setUser] = useState(Cookies.get("user" === "undefined") && null);
  const [showModal, setShowModal] = useState(false);

  // Chargement
  const fetchContents = async () => {
    let Url = "https://leboncoin-api.herokuapp.com/api/offer/with-count";
    try {
      const response = await axios.get(Url);
      setContents(response.data.offers);
      setCount(response.data.count);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  if (isLoading === false) {
    console.log("App contents : ", contents);
    console.log("App showModal =>", showModal);
  }

  // Gestion utilisateur
  const logOut = () => {
    console.log("logOut");
    Cookies.remove("user");
    setUser(null);
    // setShowModal(false);
  };

  const logIn = obj => {
    // setShowModal(true);
    // response.data.token
    // {
    //     "_id": "5b4cdf774f53952a5f849635",
    //     "token": "JI9OTHS6D1oRKrSX",
    //     "account": {
    //       "username": "Farid"
    //     }
    //   }
    console.log("logIn()", obj);
    console.log("logIn()", obj.account.username);
    console.log("logIn()", obj.token);
    Cookies.set("user", obj.account.username);
    Cookies.set("token", obj.token);
    setUser(obj.account.username);
  };

  return (
    <Router>
      <div className="top-page">
        <Header
          user={user}
          logIn={logIn}
          logOut={logOut}
          setShowModal={setShowModal}
        />
      </div>
      {showModal === true && (
        <div className="modal">
          <ModalLogin setShowModal={setShowModal} logIn={logIn} />
        </div>
      )}
      <Switch>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/">
          <Hero />
          <Home contents={contents} count={count} />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
