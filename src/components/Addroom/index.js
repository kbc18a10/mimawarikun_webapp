import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import '../../styles/addroom.css'


export default class Addroom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: localStorage.getItem('api_token'),
            roomNo: "",
            className: '',
            cameraInfo: [],
            cameraEls: [],
            redirect: ''
        }
        this.addCamera = this.addCamera.bind(this);
        //this.removeCamera = this.removeCamera.bind(this);
        this.submitData = this.submitData.bind(this);
        this.handleOnChangeRoomNo = this.handleOnChangeRoomNo.bind(this);
        this.handleOnChangeClassName = this.handleOnChangeClassName.bind(this);
        this.handleOnChangeCameraName = this.handleOnChangeCameraName.bind(this);
        this.handleOnChangeUsage = this.handleOnChangeUsage.bind(this);
        this.addCamera()
    }

    addCamera() {
        var info = this.state.cameraInfo;
        var element = {
            id: info.length + 1,
            name: "",
            usetype: ""
        };
        info.push(element);
        this.setState({ cameraInfo: info })
        const len = this.state.cameraInfo.length;
        const name = 'cameraName' + len;
        const usage = 'usage' + len;
        //const btnId = 'btn' + len;
        var inputNameEle = <input id={name} type="text" onChange={e => this.handleOnChangeCameraName(e)} />
        var camInfo = [<p>カメラ名</p>, inputNameEle];
        var element1 = React.createElement('div', { className: 'textTitle' }, camInfo);
        var inputUsageEle = <input id={usage} type="text" onChange={e => this.handleOnChangeUsage(e)} />
        var usageInfo = [<p>利用用途</p>, inputUsageEle];
        var element2 = React.createElement('div', { className: 'textTitle' }, usageInfo);
        //var btn = <button className="remove" id={btnId} value='x' type="button" onClick={e => this.removeCamera(e)}/>

        /*
        var elements = [element1,element2,btn];
        if(this.state.cameraEls == ""){
            elements = [element1,element2];
        }
        */
        var elements = [element1, element2];
        var camera = React.createElement('div', { className: 'main' }, elements);
        var cameraEls = this.state.cameraEls;
        cameraEls.push(camera);

        this.setState({ cameraEls: cameraEls });
    }

    /*
    removeCamera(e){
        var index = e.target.id.slice(-1) - 1
        //console.log((e.target.id.slice(-1))-1)
        var cameras = this.state.cameraInfo;
        cameras.splice(1,1);
        for(var i = 1;i<cameras.length;i+1){
           cameras[i].id -= 1;
        }
        this.setState({cameraInfo:cameras})
        

        var elements = this.state.cameraEls;
        elements.splice(1,1);
        var changes = elements.splice(index);

        for(var i = 0;i<changes.length;i+1){
            index += 1;
            const name = 'cameraName' + index;
            const usage = 'usage' + index;
            var inputNameEle = <input id={name} type="text" value={this.state.cameraName} onChange={e => this.handleOnChangeCameraName(e)}/>

        }


    }
    */

    outputCamera() {
        var output = React.createElement('div', {}, this.state.cameraEls);
        return output;
    }

    async submitData() {
        const roomNo = this.state.roomNo;
        const className = this.state.className;
        const cameraInfo = this.state.cameraInfo;
        var roomInfo = { name: roomNo, class: className, cameras: cameraInfo };
        var url = `${process.env.REACT_APP_URL}/room`;
        try {
            axios.defaults.headers.common = { token: this.state.token };
            await (await axios.post(url, roomInfo));

            this.setState({ redirect: '/RoomList' });
        } catch (error) {
            console.log('Error:', error)
        }
    }

    handleOnChangeRoomNo(e) {
        this.setState({ roomNo: e.target.value })
    }

    handleOnChangeClassName(e) {
        console.log(e.target.value)
        this.setState({ className: e.target.value })
    }

    handleOnChangeCameraName(e) {
        console.log((e.target.id))
        var index = e.target.id.slice(-1);
        var info = this.state.cameraInfo;
        info[index - 1].name = e.target.value;
        this.setState({ cameraInfo: info });

    }

    handleOnChangeUsage(e) {
        console.log((e.target.id));
        var index = e.target.id.slice(-1);
        var info = this.state.cameraInfo;
        info[index - 1].usetype = e.target.value;
        this.setState({ cameraInfo: info });
    }

    render() {
        if (this.state.redirect) {
            return (
                <Redirect to={this.state.redirect} />
            );
        }

        console.log(this.state.cameraInfo);
        var cameras = this.outputCamera();
        return (
            <div id="addroom">
                <div className="clearfix" id='init'>
                    <div id="leftblock">
                        <p>部屋情報</p>
                        <div className="main">
                            <div className="textTitle">
                                <p>部名番号</p>
                                <input id="roomInfo" type="text" onChange={e => this.handleOnChangeRoomNo(e)} />
                            </div>
                            <div className="textTitle">
                                <p>クラス名</p>
                                <input id="cameraInfo" type="text" onChange={e => this.handleOnChangeClassName(e)} />
                            </div>
                        </div>
                    </div>

                    <div id="rightblock">
                        <p>カメラ情報</p>
                        {cameras}
                    </div>
                </div>
                <div id="buttonplus">
                    <button id="button-circle" type="button" name="purasu" value="+" onClick={this.addCamera}>+</button>
                </div>
                <div id="button-area2">
                    <button id="button-circle2" type="button" name="tuika" value="a" onClick={this.submitData}>追加</button>
                </div>
                <div id="button-area3">
                    <Link to={`/RoomList`}><button id="button" type="button">部屋の一覧表示</button></Link>
                    <Link to={`/top`}><button id="button" type="button">top画面へ</button></Link>
                </div>
            </div>
        )
    }
}
