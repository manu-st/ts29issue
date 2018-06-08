import * as React from "react";
import { render } from "react-dom";
import { App } from "./src/App.react";
import { Child } from "./src/Child";

const child = new Child ("Test");

render (<App store = { child } />, document.getElementById ("root"));
