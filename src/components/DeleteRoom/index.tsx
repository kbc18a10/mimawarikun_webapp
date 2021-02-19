import React, { Component } from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import axios from 'axios';
import '../../styles/deleteRoom.css'
import RoomList from '../RoomList';

interface Props extends RouteComponentProps<{ id: string }> {

}

interface Camera {
    id: number,
    user_id: number,
    room_id: number,
    name: string,
    usetype: string,
    created_at: string,
    updated_at: string,
}


//部屋の型
interface Room {
    user_id: number,
    name: string,
    class: string,
    cameras: Camera[],
    created_at: string,
    updated_at: string,
}

interface State {
    token: string | null,
    name: string,
    class: string,
    cameras: Camera[],
    redirect: string
}

export default class DeleteRoom extends Component<Props, State> {
    state = {
        token: localStorage.getItem('api_token'),
        name: '',
        class: '',
        cameras: [],
        redirect: ''
    }

    constructor(prosp: Props) {
        super(prosp);

        this.requeestDeleteRoom = this.requeestDeleteRoom.bind(this);
        this.cancelRedirect = this.cancelRedirect.bind(this);
    }

    /**
     * 対象の部屋データ取得
     */
    async getRoomData() {
        //APIURL
        const url = `${process.env.REACT_APP_URL}/room/${this.props.match.params.id}`;

        //ヘッダー設定
        axios.defaults.headers.common = { token: this.state.token };
        try {
            //部屋情報取得
            const resRoomData: Room = (await axios.get(url)).data;
            console.log(resRoomData);

            //APIから取得した部屋情報をセット
            this.setState({ name: resRoomData.name });
            this.setState({ class: resRoomData.class });
            this.setState({ cameras: resRoomData.cameras });
        } catch (error) {
            console.log(error.responce);
        }
    }

    async requeestDeleteRoom() {
        const url = `${process.env.REACT_APP_URL}/room/${this.props.match.params.id}`;

        axios.defaults.headers.common = { token: this.state.token };

        try {
            await axios.delete(url);

            this.setState({ redirect: '/RoomList' });
        } catch (error) {
            console.log(error.responce);
        }
    }

    cancelRedirect() {
        this.setState({ redirect: '/RoomList' });
    }

    createCamraRows() {
        //カメラ配列の要素は空であるか？
        if (!this.state.cameras.length) {
            return;
        }

        return this.state.cameras.map((camera: Camera) => {
            return (
                <tr>
                    <th>{camera.name}</th>
                    <th>{camera.usetype}</th>
                </tr>
            );
        });

    }

    componentDidMount() {
        this.getRoomData();
    }

    render() {
        if (this.state.redirect) {
            return (
                <Redirect to={this.state.redirect} />
            );
        }

        return (
            <div>
                <div className={'delete-answer'}>
                    <h1>以下の部屋とカメラの情報を削除してもよろしいでしょうか？</h1>
                    <button className={'deletebtn'} onClick={this.requeestDeleteRoom}>
                        削除
                    </button>
                    <button onClick={this.cancelRedirect}>
                        キャンセル
                    </button>
                </div>
                <table className={'maintable'}>
                    <tr>
                        <th>部屋番号</th>
                        <th>クラス</th>
                    </tr>
                    <tr>
                        {this.state.name ? (
                            <td>{this.state.name}</td>
                        ) : ''}
                        {this.state.class ? (
                            <td>{this.state.class}</td>
                        ) : ''}
                    </tr>
                </table>
                {this.state.cameras.length ? (
                    <table className={'maintable'}>
                        <tr>
                            <th>カメラ名</th>
                            <th>使用用途</th>
                        </tr>
                        {this.createCamraRows()}
                    </table>
                ) : ''}
            </div>
        )
    }
}
