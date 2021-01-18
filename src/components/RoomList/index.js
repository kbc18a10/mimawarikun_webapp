import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class RoomList extends Component{
    to_addroom(e){
        e.preventDefault()
        location.href='./addroom'
    }
    to_top(e) {
        e.preventDefault()
        location.href='./top'
    }
    render(){
        return (
            <div>
                <img id="menu" src="https://s3-ap-northeast-1.amazonaws.com/mimawarikun.strage/tai.png" />
                <div className="roomlist">
                    <table id="resultTable" border="1">
                        <tbody><tr><th>101</th><td><a href="./edit.html">編集</a></td><td><a href="./delete.html">削除</a></td></tr>
                        <tr><th>102</th><td><a href="./edit.html">編集</a></td><td><a href="./delete.html">削除</a></td></tr>
                        <tr><th>103</th><td><a href="./edit.html">編集</a></td><td><a href="./delete.html">削除</a></td></tr>
                        <tr><th>201</th><td><a href="./edit.html">編集</a></td><td><a href="./delete.html">削除</a></td></tr>
                        <tr><th>202</th><td><a href="./edit.html">編集</a></td><td><a href="./delete.html">削除</a></td></tr>
                        <tr><th>203</th><td><a href="./edit.html">編集</a></td><td><a href="./delete.html">削除</a></td></tr>
                        <tr><th>204</th><td><a href="./edit.html">編集</a></td><td><a href="./delete.html">削除</a></td></tr></tbody>
                    </table>
                </div>
                <div className="pagenation">
                    <button type="button" id="page1">1</button>
                    <button type="button" id="page2">2</button>
                    <button type="button" id="page3">3</button>
                </div>
                <div className="btn_area">
                    <button id="to_addroom" onClick={this.to_addroom}>部屋の追加</button>
                    <button id="to_top" onClick={this.to_top}>top画面へ</button>
                </div>
            </div>
        )
    }
}
