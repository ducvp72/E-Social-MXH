import React, { useEffect } from "react";
import "./css/style.css";
import Routes from "./routes/routes";
import { createAxiosResponseInterceptor } from "./utils/handleRefresh";
// createAxiosResponseInterceptor();

const App = () => {
  return <Routes />;
};

export default App;
