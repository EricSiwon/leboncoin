import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
//
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import ModalLogin from "./components/Login";
import Register from "./components/Register";
import Search from "./components/Search";
import Publish from "./components/Publish";
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
  const [clickHome, setClickHome] = useState(false);
  // Gestion Utilisateur
  const userCookie = Cookies.get("user");
  const token = Cookies.get("token");
  const [user, setUser] = useState({ token: token });
  console.log("App user : ", user);

  const [showModal, setShowModal] = useState(false);

  // Chargement
  const fetchContents = async () => {
    let Url = "https://localhost:4000/api/offer/with-count";
    console.log("fetchContents", Url);
    try {
      const response = await axios.get(Url);
      setContents(response.data.offers);
      setCount(response.data.count);
      setIsLoading(false);
      setClickHome(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchContents();
  }, [clickHome]);

  if (isLoading === false) {
    console.log("App contents : ", contents);
    console.log("App showModal =>", showModal);
  }

  // Gestion utilisateur
  const logOut = () => {
    console.log("logOut");
    Cookies.remove("user");
    Cookies.remove("token");
    setUser({});
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
    setUser(obj);
  };

  return (
    <Router>
      <div className="top-page">
        <Header
          user={user}
          username={userCookie}
          logIn={logIn}
          logOut={logOut}
          setShowModal={setShowModal}
          setClickHome={setClickHome}
        />
      </div>
      {showModal === true && (
        <div className="modal1">
          <ModalLogin setShowModal={setShowModal} logIn={logIn} />
        </div>
      )}
      <Switch>
        <Route path="/sign_up">
          <Register logIn={logIn} />
        </Route>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/publish">
          <Publish />
        </Route>
        <Route path="/search">
          <Search setContents={setContents} setCount={setCount} />
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
