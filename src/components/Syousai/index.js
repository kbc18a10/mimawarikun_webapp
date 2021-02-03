import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { isNumber } from 'util'

import '../../styles/syousaihennsyuustyle.css'


export default class syousaihennsyuu extends Component{
    constructor(props){
        super(props)
        this.state = {
            tekitou:[]
        }
           this.hanntei1 = this.hanntei1.bind(this);
    }

    hanntei1(){
        var row1=<tr><td class="noborder" >&nbsp;</td><td class="noborder" >&nbsp;</td></tr>
        var row2 =<tr><td class="noborder" align="right">カメラ名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td ><input id={"cameranum"+this.state.tekitou.length} name="cameranamae" type="text" /></td></tr>
        var row3=<tr><td class="noborder" align="right">      使用用途&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td><input id={"youtonum"+this.state.tekitou.length}name="youto" type="text" /></td></tr>      
        
        var element = React.createElement('tbody',{id:'aaa'},[row1,row2,row3])
        var el =React.createElement('table',{id:'Detailedediting',border:'1'},element)
        var elements= this.state.tekitou
        elements.push(el);
        this.setState({tekitou:elements });
    }
    bunnkatukunn(){
        var output =React.createElement('div',{id:'soton'},this.state.tekitou)
        return output;
    }
    render(){
        var kekka= this.bunnkatukunn();
        return (
            <div id="syousai">
                <img id="menu" src="https://s3-ap-northeast-1.amazonaws.com/mimawarikun.strage/tai2.png" />
                <div className="Detailedediting">
                    <table id="Detailedediting" border="1">
                    <tbody>
                        <tr><td class="noborder"  align="right">部屋番号</td><td><input name="room" type="text" /></td></tr>
　                      <tr><td class="noborder" align="right" >利用しているクラス</td><td><input name="class" type="text" /></td></tr>
                        <tr><td class="noborder" >&nbsp;</td><td class="noborder" >&nbsp;</td></tr>
                        <tr><td class="noborder" align="right">      カメラ名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td ><input id="cameranum" name="cameranamae" type="text" /></td></tr>
                        <tr><td class="noborder" align="right">      使用用途&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td><input id="youtonum"name="youto" type="text" /></td></tr>      
                        </tbody>
                    </table>
                </div>
                {kekka}
                 <button name="camera" value="true" onClick={this.hanntei1}>カメラを追加</button>
                

                <div className="btn_area">
                <Link to={``}>
                        <button >変更を保存する</button>
                    </Link>
                    <Link to={`/roomlist`}>
                        <button id="to_roomlist">部屋の一覧表示</button>
                    </Link>
                    <Link to={`/top`}>
                        <button id="to_top">top画面へ</button>
                    </Link>
                </div>
            </div>
        )
    }
}