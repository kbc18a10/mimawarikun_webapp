import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/Top.css'

export default class Top extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: '',
            roomList: [],
            displayType: ''
        };
    }

    render() {
        return (
            <div>
                <div id="radiobutton">
                    <p className="radios-description">表示する状態を選択</p>
                    <p>
                        <input type="radio" name="r1" value="ichirannhyouji" class="radiobutton" />
                        <input type="radio" name="r1" value="dennki" class="radiobutton" />電気
                        <input type="radio" name="r1" value="hitonoumu" class="radiobutton" />人の有無
                        <input type="radio" name="r1" value="madonosejyou" class="radiobutton" />窓の施錠
                    </p>
                </div>
                <div>
                    <table id="maintable" border="1">
                        <tr>
                            <th>部屋番号</th><th>電気</th><th>人の有無</th><th>窓の施錠</th>
                        </tr>
                        <tr>
                            <th>100</th><th></th><th></th><th></th>
                        </tr>

                        <tr>
                            <th>101</th><th></th><th></th><th></th>
                        </tr>

                        <tr>
                            <th>102</th><th></th><th></th><th></th>
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
