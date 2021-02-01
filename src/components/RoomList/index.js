import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/roomList.css'


export default class RoomList extends Component{
    constructor(props){
        super(props)
        const rooms = [{name:101},{name:102},{name:103},{name:104},{name:105},{name:106},{name:107}] //仮
        //const rooms = []
        this.state = {
            token:'7BOtayK7Y7a7urkG03MjLrKCejeoKATfTYOiyXXK9zxNsIMDTZcRAfYCWZQt',
            roomInfo:rooms,
            index:1,
            page:Math.ceil(rooms.length / 5),
        }
        //this.setRoomInfo()
        this.setIndex = this.setIndex.bind(this);
    }

    async getRoomInfo(url) {
        const headers = {'Content-Type': 'application/json','token':this.state.token}
        try{
            const response = await (await fetch(url,{mode: 'no-cors', headers: headers})).text() 
            console.log(response)
        }catch(error){
            console.error('Error:', error)
        }
    }

    setRoomInfo(){
        this.getRoomInfo('http://localhost:8085/api/room')
    }

    setIndex(e){
        this.setState({index:e.target.value})
    }

    getPagenation(){
        var buttons = []
        for(let i = 1;i <= this.state.page;i++){
            var str = <button type="button" id={"page"+i} value={i} onClick={this.setIndex}>{i}</button>
            buttons.push(str)
        }
        var element = React.createElement('div',{id:'page'},buttons)
        return element
    }

    getTable(){
        var str = '<table id="resultTable" border="1"><tbody>'
        const startIndex = (this.state.index - 1) * 5
        let endIndex = startIndex + 4
        if(this.state.roomInfo.length < endIndex){
            endIndex = this.state.roomInfo.length - 1
        }
        this.state.roomInfo.forEach((element,index) => {
            if(startIndex <= index && index <= endIndex){
                str += `<tr><th>${element['name']}</th><td><a href="./edit">編集</a></td><td><a href="./delete">削除</a></td></tr>`
            }
        })
        str += '</tbody></table>'
        return str
    }
    
    render(){
        const roomTable = this.getTable()
        const pagenation = this.getPagenation()
        return (
            <div>
                <img id="menu" src="https://s3-ap-northeast-1.amazonaws.com/mimawarikun.strage/tai.png" />
                <div className="roomlist">
                    <table id="resultTable" border="1">
                        <tbody dangerouslySetInnerHTML={{ __html: roomTable }}></tbody>
                    </table>
                </div>   
                <div className="pagenation" id="pagenation">
                    {pagenation}
                </div>
                <div className="btn_area">
                    <Link to={`/addroom`}>
                        <button id="to_addroom">部屋の追加</button>
                    </Link>
                    <Link to={`/top`}>
                        <button id="to_top">top画面へ</button>
                    </Link>
                </div>
            </div>
        )
    }
}
