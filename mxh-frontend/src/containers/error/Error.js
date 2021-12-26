import * as React from "react";
import "./error.css";
import { Helmet } from "react-helmet-async";
const NotFound = () => {
  return (
    <div className="body">
      <Helmet>
        <title>404 error</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <section id="not-found">
        <div className="circles">
          <p>
            404
            <br />
            <small>PAGE NOT FOUND</small>
          </p>
          <span className="circle big"></span>
          <span className="circle med"></span>
          <span className="circle small"></span>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
