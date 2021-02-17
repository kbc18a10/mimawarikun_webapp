import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/Top.css'
import axios from 'axios';

interface Props {
}

//部屋の型
interface Room {
    id: number,
    user_id: number
    name: string,
    class: string,
    created_at: string,
    updated_at: string,
    electricity?: boolean,
    person?: boolean,
    window?: boolean
}

interface State {
    token: string,
    roomList: Room[],
    roomListIndex: number,
    displayType: string,
    pagenationLastNumber: number,
    pagenationActiveNumber: number,
}


export default class Top extends Component<Props, State>{
    state = {
        token: 'W3F9gkQpgaRjNairZdToCugR4KtydOLmzVQfbOwqFiuoRpwqAY1RSflIAMRM',
        roomList: [],
        roomListIndex: 0,
        displayType: 'all',
        pagenationLastNumber: 1,
        pagenationActiveNumber: 0
    };

    constructor(props: Props) {
        super(props);

        this.setDisplayType = this.setDisplayType.bind(this);
    }

    setDisplayType(e: any) {
        this.setState({ displayType: e.target.value });
    }

    async getRoomDatas(pageNum: number = 0) {
        const url = `${process.env.REACT_APP_URL}/room/state`;

        axios.defaults.headers.common = {
            token: this.state.token
        };

        let res;
        try {
            res = await (await axios.get(url)).data;
        } catch (error) {
            console.log(error.responce);
            return;
        }
        const roomDatas: Room[] = res;

        this.setState({ pagenationLastNumber: roomDatas.length })

        this.setState({ roomList: roomDatas });
    }

    createRoomTables() {
        const tableDatas: JSX.Element[] = [];

        this.state.roomList.map((room: Room, index: number) => {
            if (!room.person && !room.electricity && !room.window) {
                return;
            }

            tableDatas.push(
                <tr>
                    <td>{room.name}</td>
                    <td>{room.person ? '×' : ''}</td>
                    <td>{room.electricity ? '×' : ''}</td>
                    <td>{room.window ? '×' : ''}</td>
                </tr>
            );
        });

        return tableDatas;
    }

    createPagenation() {
        const pagenationButtons: JSX.Element[] = [];
        console.log(this.state.roomList.length, this.state.roomList);

        for (let i = 1; i <= this.state.roomList.length / 5; i++) {
            pagenationButtons.push(
                <button id="buttonn" type="button"
                    value={i} onClick={() => { }}>{i}</button>
            );
        }

        return pagenationButtons;
    }

    componentDidMount() {
        this.getRoomDatas();
    }

    render() {
        return (
            <div>
                <div id="radiobutton">
                    <p className="radios-description">表示する状態を選択</p>
                    <p>
                        <input type="radio" name="r1" value="all" className="radiobutton"
                            checked={this.state.displayType === 'all'}
                            onChange={this.setDisplayType}
                        />全ての状態を表示
                        <input type="radio" name="r1" value="electricity" className="radiobutton"
                            checked={this.state.displayType === 'electricity'}
                            onChange={this.setDisplayType}
                        />電気
                        <input type="radio" name="r1" value="person" className="radiobutton"
                            checked={this.state.displayType === 'person'}
                            onChange={this.setDisplayType}
                        />人の有無
                        <input type="radio" name="r1" value="window" className="radiobutton"
                            checked={this.state.displayType === 'window'}
                            onChange={this.setDisplayType}
                        />窓の施錠
                    </p>
                </div>
                <div>
                    <table id="maintable">
                        <tr>
                            <th>部屋番号</th><th>電気</th><th>人の有無</th><th>窓の施錠</th>
                        </tr>
                        {this.createRoomTables()}
                    </table>
                    {!this.state.pagenationLastNumber &&
                        <h1>問題のある部屋はありません。</h1>
                    }
                </div>
                <div id="button-area">
                    {this.createPagenation()}
                </div>
                <div id="button-area2">
                    <Link to={`/top`}><button id="button" type="button">部屋の追加</button></Link>
                    <Link to={`/RoomList`}><button id="button" type="button">部屋の一覧表示</button></Link>
                </div>
            </div>
        )
    }
}
