import React from "react";
import Lost from "../components/icons/Lost";

const Notfound = () => {
  return (
    <div id="notfound">
      <div className="content">
        <h1>Whoops, this page is not available</h1>
        <Lost />
      </div>
    </div>
  );
};

export default Notfound;
