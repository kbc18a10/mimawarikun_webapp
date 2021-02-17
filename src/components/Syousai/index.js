import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router';
import axios from 'axios'
import tai2 from './images/tai2.png'
import '../../styles/syousaihennsyuustyle.css'


class syousaihennsyuu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: localStorage.getItem('api_token'),
            id: this.getId(),
            roomNo: '',
            className: '',
            roomInfo: {},
            tekitou: [],
            cameraAry: [],
            done: false
        }
        this.hanntei1 = this.hanntei1.bind(this);
        this.handleOnChangeRoomNo = this.handleOnChangeRoomNo.bind(this);
        this.handleOnChangeClassName = this.handleOnChangeClassName.bind(this);
        this.handleOnChangeCameraName = this.handleOnChangeCameraName.bind(this);
        this.handleOnChangeUsetype = this.handleOnChangeUsetype.bind(this);
        this.submitData = this.submitData.bind(this);
        this.setRoomInfo()
    }

    getId() {
        try {
            var id = this.props.location.state.id
            return id
        } catch {
            this.props.history.push('/roomlist')
            return
        }
    }

    async setRoomInfo() {
        if (this.state.id == '') {
            this.hanntei1()
            return
        }
        var url = 'http://localhost:8085/api/room/' + this.state.id
        axios.defaults.headers.common = { token: this.state.token }
        try {
            var response = await (await axios.get(url)).data
            this.setState({ roomInfo: response, roomNo: response.name, className: response.class, done: true })
            this.hanntei1()
        } catch (error) {
            console.error('Error:', error.response)
        }
    }

    hanntei1() {
        if (!this.state.done) {
            return
        }
        var cameras = this.state.roomInfo.cameras
        if (this.state.tekitou.length == 0) {
            if (cameras.length == 0) {
                this.addElement()
            } else {
                for (var i = 0; i < cameras.length; i++) {
                    this.addElement()
                }
            }
        } else {
            this.addElement()
        }
    }

    addElement() {
        var len = this.state.cameraAry.length
        var cameraAry = this.state.cameraAry
        var cameraInfo = {
            id: "",
            name: "",
            usetype: "",
        }
        cameraAry.push(cameraInfo)
        this.setState({ cameraAry: cameraAry })
        var cameras = this.state.roomInfo.cameras
        var id;
        var nameValue;
        var utValue;
        try {
            id = cameras[len].id
        } catch {
            id = ''
        }
        try {
            nameValue = cameras[len].name
        } catch {
            nameValue = ''
        }
        try {
            utValue = cameras[len].usetype
        } catch {
            utValue = ''
        }
        var row1 = <tr><td class="noborder" >&nbsp;</td><td class="noborder" >&nbsp;</td></tr>
        var row2 = <tr><td class="noborder" align="right">カメラ名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td><input id={"cameranum" + len} type="text" onChange={e => this.handleOnChangeCameraName(e)} defaultValue={nameValue} /></td></tr>
        var row3 = <tr><td class="noborder" align="right">      使用用途&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td><input id={"youtonum" + len} type="text" onChange={e => this.handleOnChangeUsetype(e)} defaultValue={utValue} /></td></tr>
        var element_tbody = React.createElement('tbody', {}, [row1, row2, row3])
        var element_table = React.createElement('table', { id: 'Detailedediting', border: '1' }, element_tbody)
        var ary = this.state.tekitou
        ary.push(element_table)
        cameraAry = this.state.cameraAry
        cameraAry[len].id = id
        cameraAry[len].name = nameValue
        cameraAry[len].usetype = utValue
        this.setState({ tekitou: ary, cameraAry: cameraAry });
    }

    bunnkatukunn() {
        var output = React.createElement('div', { id: 'soton' }, this.state.tekitou)
        return output;
    }

    handleOnChangeRoomNo(e) {
        if (!this.state.done) {
            return
        }
        this.setState({ roomNo: e.target.value })
    }

    handleOnChangeClassName(e) {
        if (!this.state.done) {
            return
        }
        this.setState({ className: e.target.value })
    }

    handleOnChangeCameraName(e) {
        var index = e.target.id.slice(-1)
        var cameraAry = this.state.cameraAry
        cameraAry[index].name = e.target.value
        this.setState({ cameraAry: cameraAry })
    }

    handleOnChangeUsetype(e) {
        var index = e.target.id.slice(-1)
        var cameraAry = this.state.cameraAry
        cameraAry[index].usetype = e.target.value
        this.setState({ cameraAry: cameraAry })
    }

    async submitData() {
        const roomNo = this.state.roomNo
        const className = this.state.className
        const cameraInfo = this.state.cameraAry
        const roomInfo = { name: roomNo, class: className, cameras: cameraInfo };
        var url = 'http://localhost:8085/api/room/' + this.state.id;
        console.log(url)
        try {
            axios.defaults.headers.common = { token: this.state.token };
            await (await axios.put(url, roomInfo));
        } catch (error) {
            console.log('Error:', error.response);
        }

    }

    render() {
        var kekka = this.bunnkatukunn();
        const roomNo = this.state.roomNo
        const className = this.state.className
        const cameraInfo = this.state.cameraAry
        const roomInfo = { name: roomNo, class: className, cameras: cameraInfo };
        console.log(roomInfo)
        return (
            <div id="syousai">
                <img id="menu" src={tai2.png} />
                <div className="Detailedediting">
                    <table id="Detailedediting" border="1">
                        <tbody>
                            <tr><td class="noborder" align="right">部屋番号</td><td><input name="room" type="text" onChange={e => this.handleOnChangeRoomNo(e)} value={this.state.roomNo} /></td></tr>
                            <tr><td class="noborder" align="right" >利用しているクラス</td><td><input name="class" type="text" onChange={e => this.handleOnChangeClassName(e)} value={this.state.className} /></td></tr>
                            <tr><td class="noborder" >&nbsp;</td><td class="noborder" >&nbsp;</td></tr>
                        </tbody>
                    </table>
                    {kekka}

                </div>
                <button name="camera" value="true" onClick={this.hanntei1}>カメラを追加</button>
                <div className="btn_area">
                    <Link to={`/roomlist`}>
                        <button onClick={this.submitData}>変更を保存する</button>
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

export default withRouter(syousaihennsyuu)
