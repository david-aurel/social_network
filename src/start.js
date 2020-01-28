import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";

// if the user is logged out, we show the welcome component, otherwise, we just show the logo in the top of the other routes
let elem;
if (location.pathname == "/welcome") {
    elem = <Welcome />;
} else {
    elem = <h1 className="logo">nice</h1>;
}

ReactDOM.render(elem, document.querySelector("main"));
