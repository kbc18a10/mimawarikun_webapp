import React, { Component } from 'react'
import '../../styles/Login.css'
import loginlogo from './images/loginlogo.png'

export default class Login extends Component{

    render(){
        return (
            <div id="form">
                <form action="" method="post">
                    <img src={loginlogo}/>
                    <p>mail address</p>
                    <input type="text" size="30" name="maddr"/>
                    <p>password</p>
                    <input type="password" size="30" name="pswor"/><br/>
                    <button>login</button>
                </form>
                <a href="">→新規登録</a>
            </div>
        )
    }
}