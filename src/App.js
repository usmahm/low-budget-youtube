import React, { Fragment } from "react";
import { Route } from 'react-router-dom'
// import axios from "axios";

import Sidebar from "./containers/Sidebar/Sidebar";
import Header from "./containers/Header/Header";
import Home from "./containers/Home/Home";
import Trending from "./containers/Trending/Trending";
import WatchVid from './containers/WatchVid/WatchVid';

// import data from "./data";
import "./App.scss";

const App = props => {
  let routes = (
    <Fragment>
      <Route path="/subscription" component={WatchVid} />
      <Route path='/trending' component={Trending} />
      <Route exact path="/" component={Home} />
      {/* <Redirect to="/" /> */}
    </Fragment>
  )

  return (
    <div className="App">
      <Header />
      <Sidebar />
      {routes}
    </div>
  );
}

export default App;
