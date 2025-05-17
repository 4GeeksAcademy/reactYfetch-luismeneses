import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { App } from "./App";

//create your first component
const Home = () => {
  return (
    <div className="text-center">
      <App />
    </div>
  );
};

export default Home;
