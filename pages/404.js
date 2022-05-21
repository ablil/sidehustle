import React from "react";
import { NextSeo } from "next-seo";
import Lost from "../components/icons/Lost";

const Notfound = () => {
  return (
    <>
      <NextSeo title="Not Foundkl" />
      <div id="notfound">
        <div className="content">
          <h1>Whoops, this page is not available</h1>
          <Lost />
        </div>
      </div>
    </>
  );
};

export default Notfound;
