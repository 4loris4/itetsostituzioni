import "../scss/index.scss";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import SelectView from "./components/SelectView";

const view = localStorage.getItem("view") && ["class", "teacher"].includes(localStorage.getItem("view")) ? localStorage.getItem("view") as "class" | "teacher" : undefined;
ReactDOM.render(view ? <App view={view} /> : <SelectView />, document.getElementById("root"));