/**
 * Created by boom on 2017/8/17.
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import * as Action from "../action/action";
import { Table } from 'antd';
import $ from "jquery";
import 'antd/lib/table/style/css';
import Form from "./form";
const style = {
    width: "80%",
    margin: "5% auto"
};

class CounterContainer extends Component {
    constructor() {
        super(...arguments);

        this.onDelete = this.onDelete.bind(this);
        this.getOwnState = this.getOwnState.bind(this);

        this.state = this.getOwnState();
    }

    getOwnState() {
        return this.context.store.getState();
    }

    onDelete() {
        this.context.store.dispatch(Action.replyDelete(this.props.caption));
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps !== this.props) || (nextProps !== this.state);
    }

    componentDidMount() {
        this.serverRequest = $.get("http://127.0.0.1:2999/api/replyList", function(result) {
            if (result.code === 200) {
                this.setState({
                    data: result.data
                });
            }
        }.bind(this));
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    render() {
        const columns = [
            {
                title: '关键字',
                dataIndex: 'keywords',
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
                render: (text, record) => (
                    <div>
                        <Form data={record} title="修改" name="更新" />
                    </div>
                ),
            }
        ];
        return <Table style={style} columns={columns} dataSource={this.state.data} rowKey="_id" />
    }
}

CounterContainer.contextTypes = {
    store: PropTypes.object
};

export default CounterContainer;