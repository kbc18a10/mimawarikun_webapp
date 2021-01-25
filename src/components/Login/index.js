import React, { Component } from 'react'
import '../../styles/Login.css'

export default class Login extends Component{

    render(){
        return (
            <div>
                <form action="" method="post">
                    <h2>ログイン</h2>
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