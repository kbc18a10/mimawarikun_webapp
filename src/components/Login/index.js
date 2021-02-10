import React, { Component } from 'react';
import '../../styles/Login.css';
import loginlogo from '../../images/loginlogo.png';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            isLogin: localStorage.getItem('api_token') ? true : false
        };

        this.doLogin = this.doLogin.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPaswword = this.setPaswword.bind(this);

    }

    async doLogin() {
        const url = process.env.REACT_APP_URL + '/login';
        const data = { email: this.state.email, password: this.state.password };
        console.log(data);

        try {
            const res = await (await axios.post(url, data)).data;
            console.log(res);
            localStorage.setItem('api_token', res.api_token);
            console.log(localStorage);

            this.setState({ isLogin: true });
        } catch (error) {
            console.log(error.response);
        }
    }

    setEmail(e) {
        this.setState({ email: e.currentTarget.value });
    }

    setPaswword(e) {
        this.setState({ password: e.currentTarget.value });
    }

    render() {
        if (this.state.isLogin) {
            return <Redirect to="/top" compoent="../Top" />
        }

        return (
            <div id="form">
                {/* action属性は環境に合わせた宛先に変えておく */}
                <div>
                    <img src={loginlogo} />
                    <p>mail address</p>
                    <input type="text" size="30" name="email" onChange={this.setEmail} />
                    <p>password</p>
                    <input type="password" size="30" name="password" onChange={this.setPaswword} /><br />
                    <button onClick={this.doLogin}>login</button>
                </div>
                <Link to={`/newentry`}>→新規登録</Link>
            </div>
        )
    }
}
