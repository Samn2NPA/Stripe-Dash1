import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { TabList, Tab } from "./Tabs";
import Checkout from "./Checkout.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.setState({
    })
  }

  render() {
    return (
      <TabList>
        <Tab name="Checkout">
        <Checkout />
        </Tab>
        <Tab name="B">
        <div><h2> Hello B </h2></div>
        </Tab>
        <Tab name="C">
        <div><h2> Hello C </h2></div>
        </Tab>
      </TabList>
    );
  }
}

export default App;
