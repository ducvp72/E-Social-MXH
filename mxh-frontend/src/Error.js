import * as React from "react";
import { useEffect } from "react";
import "./css/error.css";
const Error = () => {
 
  useEffect(()=>{
    document.title="404 - E-Social"
  },[]);

  return (
    <div className="body">
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

export default Error;
