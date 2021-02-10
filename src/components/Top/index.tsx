import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/Top.css'

interface Props {
}

//部屋の型
interface Room {
    name: string,
    electricity: boolean
    person: boolean,
    window: boolean
}

interface State {
    token: string,
    roomList: Room[],
    displayType: string,
}


export default class Top extends Component<Props, State>{
    state = {
        token: '',
        roomList: [],
        displayType: 'all'
    };

    constructor(props: Props) {
        super(props);

        this.setDisplayType = this.setDisplayType.bind(this);
    }

    setDisplayType(e: any) {
        this.setState({ displayType: e.target.value });
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
                        <tr>
                            <td>100</td><td></td><td></td><td></td>
                        </tr>

                        <tr>
                            <td>101</td><td></td><td></td><td></td>
                        </tr>

                        <tr>
                            <td>102</td><td></td><td></td><td></td>
                        </tr>
                    </table>
                </div>
                <div id="button-area">
                    <button id="buttonn" type="button" name="suuji" value="1" >1</button>
                    <button id="buttonn" type="button" name="suuji" value="2" >2</button>
                    <button id="buttonn" type="button" name="suuji" value="3" >3</button>
                </div>
                <div id="button-area2">
                    <Link to={`/top`}><button id="button" type="button">部屋の追加</button></Link>
                    <Link to={`/RoomList`}><button id="button" type="button">部屋の一覧表示</button></Link>
                </div>
            </div>
        )
    }
}
