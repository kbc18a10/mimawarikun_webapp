import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import tai from './images/tai.png'
import Syousai from '../Syousai'
import '../../styles/roomList.css'

export default class RoomList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: localStorage.getItem('api_token'),
            roomInfo: {},
            init: false
        }
        this.setIndex = this.setIndex.bind(this);
        this.redirect = this.redirect.bind(this);
    }

    async getRoomInfo(url) {
        axios.defaults.headers.common = { token: this.state.token };
        try {
            const response = await (await axios.get(url)).data
            this.setState({ roomInfo: response, init: true })
            console.log(response)
        } catch (error) {
            console.error('Error:', error.response);
        }
    }

    setRoomInfo(url = 'http://localhost:8085/api/room') {
        this.getRoomInfo(url)
    }

    setIndex(e) {
        this.setRoomInfo(e.target.value)
    }

    getPagenation() {
        var buttons = []
        for (let i = 1; i <= this.state.roomInfo.last_page; i++) {
            var btn = <button type="button" id={"page" + i} key={"page" + i} value={this.state.roomInfo.links[i].url} onClick={this.setIndex}>{i}</button>
            buttons.push(btn)
        }
        var element = React.createElement('div', { id: 'page' }, buttons)
        return element
    }

    getTable() {
        var rows = []
        this.state.roomInfo.data.forEach((element, index) => {
            var row = <tr key={index}><th>{element.name}</th><td><a id={element.id} href='' onClick={e => this.redirect(e)}>編集</a></td><td><a href="./delete">削除</a></td></tr>
            rows.push(row)
        })
        var element = React.createElement('table', { id: 'resultTable', border: '1' }, rows)
        return element
    }

    redirect(e) {
        this.props.history.push({
            pathname: "/syousai",
            state: { id: e.target.id }
        });
    }

    render() {
        let roomTable, pagenation
        if (!this.state.init) {
            this.setRoomInfo()
        } else {
            roomTable = this.getTable()
            pagenation = this.getPagenation()
        }
        return (
            <div>
                <img id="menu" src={tai} />
                <div className="roomlist">
                    <table id="resultTable" border="1">
                        {roomTable}
                    </table>
                </div>
                <div className="pagenation" id="pagenation">
                    {pagenation}
                </div>
                <div className="btn_area">
                    <Link to={`/addroom`}><button id="to_addroom">部屋の追加</button></Link>
                    <Link to={`/top`}><button id="to_top">top画面へ</button></Link>
                </div>
            </div>
        )
    }
}
