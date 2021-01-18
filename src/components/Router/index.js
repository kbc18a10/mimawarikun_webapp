import {
    BrowserRouter,
    Route
  } from "react-router-dom";
  
import RoomList from "../RoomList";
import React,{Component} from "react";   

export default class Router extends Component{

  render(){
    return(
      <BrowserRouter>
          <Route path="/" component={RoomList} /> 
      </BrowserRouter>
      )
  }
}
