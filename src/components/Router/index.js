import {
    BrowserRouter,
    Route,
    Switch
  } from "react-router-dom";
  
import RoomList from "../RoomList";
import Top from "../Top";
import Addroom from "../Addroom";
import Syousai from "../Syousai";
import React,{Component} from "react";   


import Login from "../Login"

export default class Router extends React.Component{

  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route path='/top' component={Top} /> 
          <Route path='/addroom' component={Addroom} />
          <Route path='/roomlist' component={RoomList} />
          <Route path='/syousai' component={Syousai}/>
          {/* ↓書き換えた直す */}
          <Route path="/" component={Login}/>
        </Switch>
      </BrowserRouter>
      )
  }
}
