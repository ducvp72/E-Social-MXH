import React, { useEffect } from "react";
import "./css/style.css";
import Routes from "./routes/routes";

const App = () => {
  useEffect(() => {
    //#region Console log without JS line. Just for fun
    const cssRuleTitle = `color: rgb(240,81,35);
    font-size: 60px;
    font-weight: bold;
    text-shadow: 1px 1px 5px rgb(240,81,35);`;
    const cssRuleInfo = `color: #1473e6; font-size: 14px; font-weight: bold; `;
    const cssRuleError = `color: #d32f2f; font-size: 14px; font-weight: bold; `;

    setTimeout(
      console.log.bind(
        console,
        "%c\n(☞ﾟヮﾟ)☞ 💢 This is a browser feature intended for developers ❗❗ ☜(ﾟヮﾟ☜)\n",
        cssRuleError
      ),
      0
    );

    setTimeout(console.log.bind(console, "%cVN-SOCIAL 🚀", cssRuleTitle), 0);
    setTimeout(
      console.log.bind(
        console,
        "%c\nHello! 🙋‍♂️ »»————-　★ Welcome to VN-SOCIAL website ★　————-««\n",
        cssRuleInfo
      ),
      0
    );
    setTimeout(
      console.log.bind(
        console,
        "%c👉 Want to work with us?\n\nCheck out 👨‍💻 https://www.facebook.com/DerrickVo72/ 🌍\n\nCheck out 👨‍💻 https://www.facebook.com/profile.php?id=100008321344928 💖\n",
        cssRuleInfo
      ),
      0
    );
    //#endregion
  }, []);

  return <Routes />;
};

export default App;
