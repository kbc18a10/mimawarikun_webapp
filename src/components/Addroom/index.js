import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/addroom.css'

export default class Addroom extends Component {
    render() {
        return (

            <div>
                <img id="menu" src="https://s3-ap-northeast-1.amazonaws.com/mimawarikun.strage/tai.png" />
                <div>


                    <div id="leftblock">
                        <p>部屋情報</p>
                        <div id="main">

                            <div id="texttittle">
                                <p>部屋情報</p>
                                <input id="text" type="text"></input>
                            </div>

                            <div id="texttittle">
                                <p>カメラ情報</p>
                                <input id="text" type="text"></input>
                            </div>

                        </div>


                    </div>

                    <div id="rightblock">
                        <p>カメラ情報</p>

                        <div id="main">

                            <div id="texttittle">
                                <p>カメラ名</p>
                                <input id="text" type="text"></input>
                            </div>

                            <div id="texttittle">
                                <p>利用用途</p>
                                <input id="text" type="text"></input>
                            </div>

                        </div>

                    </div>

                    <div id="buttonplus">
                        <button id="button-circle" type="button" name="purasu" value="+" type="submit">+</button>
                    </div>

                </div>

                <div id="button-area2">
                    <button id="button-circle2" type="button" name="tuika" value="a" type="submit">追加</button>
                </div>

                <div id="button-area3">
                    <Link to={`/RoomList`}><button id="button" type="button">部屋の一覧表示</button></Link>
                    <Link to={`/top`}><button id="button" type="button">top画面へ</button></Link>
                </div>

            </div>








        )
    }
}
