import React, { Component } from 'react';
import join from '../../images/join.png';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import '../../styles/NewEntry.css';

export default class NewEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            alert_msg: {}
        }
        this.inputCheck = this.inputCheck.bind(this);
        this.setName = this.setName.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setPasswordCfm = this.setPasswordCfm.bind(this);
    }

    async inputCheck() {
        console.log(this.state);
        const url = process.env.REACT_APP_URL + '/register';
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
        };

        try {
            const res = await (await axios.post(url, data)).data;
            localStorage.setItem('api_token', res.api_token);
        } catch (error) {
            var msges = error.response.data.error;
            console.log(msges);
            this.setState({ alert_msg: msges });
        }
    }

    setName(e) {
        this.setState({ name: e.currentTarget.value });
    }

    setEmail(e) {
        this.setState({ email: e.currentTarget.value });
    }

    setPassword(e) {
        this.setState({ password: e.currentTarget.value });
    }

    setPasswordCfm(e) {
        this.setState({ password_confirmation: e.currentTarget.value });
    }

    alertRef(kind) {
        return React.createElement('div', { id: 'info-alert' }, this.state.alert_msg[kind]);
    }

    render() {
        // var alerter=this.alertRef; 代入したらthisが書き換わってしまう
        if (localStorage.getItem('api_token')) {
            return <Redirect to="/top" compoent="../Top" />
        }

        return (
            <div id="newentry">
                <img src={join} />
                <table><tbody>
                    <tr><th>name</th><td>
                        {this.alertRef('name')}
                        <input type='text' onChange={this.setName} /></td></tr>
                    <tr><th>mail address</th><td>
                        {this.alertRef('email')}
                        <input type='text' onChange={this.setEmail} /></td></tr>
                    <tr><th>password</th><td>
                        {this.alertRef('password')}
                        <input type='password' onChange={this.setPassword} /></td></tr>
                    <tr><th>password_confirmation</th><td>
                        <input type='password' onChange={this.setPasswordCfm} /></td></tr>
                </tbody></table>
                <button onClick={this.inputCheck}>登録</button>
            </div>
        );
    }
}
