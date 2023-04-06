import React from "react";

import Clock from "./components/Clock";

import "./App.css";

import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <div id="app">
      <Provider store={store}>
        <Clock />
      </Provider>
    </div>
  );
}

export default App;
