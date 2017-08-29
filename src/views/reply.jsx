/**
 * Created by boom on 2017/8/17.
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import { Table, message } from 'antd';
import $ from "jquery";
import 'antd/lib/table/style/css';
import 'antd/lib/message/style/css';
import "./css/loginBackground.css";
import background from "./images/background.jpg";
import reply from "./images/reply.jpg";
import Form from "./form";
import Login from "./login";
const style = {
    width: "80%",
    margin: "2% auto"
};
const replyStyle = {
    position: "absolute",
    float: "left",
    zIndex: 5,
    width: "100%",
    height: "100%",
    opacity: 0.85
};
const replyImageStyle = {
    zIndex: 2,
    float: "left",
    width : "100%"
};
const imageStyle = {
    zIndex: 2,
    float: "left",
    height : "100%",
    marginLeft: "-7%"
};
const loginStyle = {
    position: "absolute",
    float: "left",
    zIndex: 5,
    margin: "15% 45%",
    width: "15%"
};
const host = "http://127.0.0.1:2999";

class CounterContainer extends Component {
    constructor() {
        super(...arguments);

        this.onDelete = this.onDelete.bind(this);
        this.getOwnState = this.getOwnState.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.onList = this.onList.bind(this);
        this.renderResult = this.renderResult.bind(this);

        this.state = this.getOwnState();
    }

    getOwnState() {
        return this.context.store.getState();
    }

    onList() {
        this.serverRequest = $.get(`${host}/api/replyList?token=${this.state.token}`, function(result) {
            if (result.code === 200) {
                this.setState({
                    data: result.data
                });
            }
        }.bind(this));
    }

    onAdd(reply, newReply) {
        this.addRequest = $.ajax({
            url: `${host}/api/replyList?token=${this.state.token}`,
            method: "post",
            data: newReply,
            success: function(data) {
                if (data.code === 200) {
                    const _state = this.state;
                    _state.data.push(data.data);
                    const state = {
                        data: _state.data
                    };
                    this.setState(state);
                    return message.success('添加成功');
                }
                message.error('添加失败');
            }.bind(this)
        });
    }

    onUpdate(reply, newReply, index) {
        this.updateRequest = $.ajax({
            url: `${host}/api/reply/${reply._id}?token=${this.state.token}`,
            method: "PUT",
            data: newReply,
            success: function(data) {
                if (data.code === 200) {
                    newReply._id = index;
                    const _state = this.state;
                    _state.data[index] = newReply;
                    const state = {
                        data: _state.data
                    };
                    this.setState(state);
                    return message.success('更新成功');
                }
                message.error('更新失败');
            }.bind(this)
        });
    }

    onDelete(id, index) {
        this.deleteRequest = $.ajax({
            url: `${host}/api/reply/${id}?token=${this.state.token}`,
            method: "DELETE",
            success: (data) => {
                if(data.code === 200) {
                    const state = this.state.data;
                    state.splice(index, 1);
                    this.setState({
                        data: state
                    });
                    return message.success('删除成功');
                }
                return message.error('删除失败');
            }
        })
    }

    onLogin(user) {
        this.loginRequest = $.ajax({
            url: `${host}/api/login`,
            method: "POST",
            data: user,
            success: (data) => {
                if(data.code === 200) {
                    this.setState({
                        token: data.token
                    });

                    this.onList();
                    return;
                }
                return message.error('账号密码输入错误');
            }
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps !== this.props) || (nextProps !== this.state);
    }

    componentWillUnmount() {
        this.serverRequest.abort();
        this.updateRequest.abort();
        this.deleteRequest.abort();
        this.addRequest.abort();
        this.loginRequest.abort();
    }

    renderResult() {
        if (this.state.token) {
            const columns = [
                {
                    title: '关键字',
                    dataIndex: 'keywords',
                    width: "20%",
                    key: 'keywords'
                },
                {
                    title: '内容',
                    dataIndex: 'content',
                    key: 'content',
                },
                {
                    title: '操作',
                    key: 'action',
                    width: "12.5%",
                    render: (text, record, index) => (
                        <div>
                            <Form
                                data={record}
                                title="修改"
                                name="更新"
                                methodName="onUpdate"
                                index={index}
                                onUpdate={this.onUpdate}
                                onDelete={this.onDelete} />
                        </div>
                    ),
                }
            ];
            return (
                <div className="Reply">
                    <img style={replyImageStyle} src={reply} alt="" />
                    <div style={replyStyle}>
                        <Form
                            title="新增"
                            name="新增"
                            methodName="onAdd"
                            onAdd={this.onAdd} />
                        <Table
                            style={style}
                            columns={columns}
                            onList={this.onList}
                            dataSource={this.state.data}
                            rowKey="_id"
                            bordered />
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="Login">
                    <img style={imageStyle} src={background} alt="" />
                    <div style={loginStyle}>
                        <Login
                            onLogin={this.onLogin} />
                    </div>
                </div>
            )
        }
    }

    render() {

        return (
            <div>
                {this.renderResult()}
            </div>
        )
    }
}

CounterContainer.contextTypes = {
    store: PropTypes.object
};

export default CounterContainer;