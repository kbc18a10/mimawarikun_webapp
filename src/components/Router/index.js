import {
    BrowserRouter,
    Route,
    Switch
  } from "react-router-dom";
  
import RoomList from "../RoomList";
import Top from "../Top";
import Addroom from "../Addroom";
import React,{Component} from "react";   

export default class Router extends React.Component{

  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route path='/top' component={Top} /> 
          <Route path='/addroom' component={Addroom} />
          <Route path='/' component={RoomList} />
        </Switch>
      </BrowserRouter>
      )
  }
}
