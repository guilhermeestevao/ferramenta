import React, { Component } from 'react';
import './App.css';
import Upload from './upload/Upload';
import { BrowserRouter, Route } from 'react-router-dom';


class App extends Component {
  render() {
    return(
      <BrowserRouter>
        <Route exact path="/" component={Upload}/>
      </BrowserRouter>
    ); 
  }
}

export default App;
