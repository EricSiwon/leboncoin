import React from "react";
import Offers from "../components/Offers";

const Home = ({ contents, count }) => {
  //   console.log("Home", contents);
  return (
    <div>
      <div className="contents">
        {contents.map(content => {
          return (
            <Offers
              key={content._id}
              id={content._id}
              title={content.title}
              price={content.price}
              created={content.created}
              pictures={content.pictures[0]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
