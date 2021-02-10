import React, { Component } from 'react'
import join from '../../images/join.png'

export default class NewEntry extends Component {
    constructor(props){
        super(props);
    }

    inputCheck(){
        
    }

    render(){
        return(
            <div id="new_entry">
                <img src={join}/>
                <table><tbody><tr><td>mail address</td><td>:&ensp;<input type='text'/></td></tr>
                <tr><td>password</td><td>:&ensp;<input type='password'/></td></tr></tbody></table>
                <button>登録</button>
            </div>
        );
    }
}