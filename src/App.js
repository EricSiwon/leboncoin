import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
// import Article from "./containers/Article";

import "./App.css";

function App() {
  const [contents, setContents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);

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
  }

  return (
    <Router>
      <div className="top-page">
        <Header />
      </div>
      <Switch>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        {/* <Route path="/article">
          <Article />
        </Route> */}
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
