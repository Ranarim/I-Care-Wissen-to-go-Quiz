import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App.js";
import { legacy_createStore as createStore } from "redux";
import {Provider} from "react-redux"
import combineReducers from "./reducers/index"
import applyMiddleware from "./middleware/index";
import { BrowserRouter as Router } from "react-router-dom";


const store = createStore(combineReducers, applyMiddleware);
const root = ReactDOM.createRoot(
  document.getElementById("root") || document.createElement("div") // <---- LOOK HERE
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);