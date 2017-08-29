import { Button, Modal, Form, Input } from 'antd';
import React, {Component} from "react";
import 'antd/lib/form/style/css';
import 'antd/lib/modal/style/css';
import 'antd/lib/button/style/css';
const FormItem = Form.Item;
const confirm = Modal.confirm;
const deleteStyle = {
    "marginLeft": "5%"
};

const CollectionCreateForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form, title, name, data } = props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title={title}
                okText={name}
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    <FormItem label="关键字">
                        {getFieldDecorator('keywords', {
                            initialValue: data.keywords || "",
                            rules: [{ required: true, message: '请填写关键字!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="内容">
                        {getFieldDecorator('content', {
                            initialValue: data.content || "",
                            rules: [{ required: true, message: '请填写内容!' }],
                        })(
                            <Input type="textarea" rows="10" />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
);

class CollectionsPage extends Component {
    constructor() {
        super(...arguments);
        
        this.onConfirm = this.onConfirm.bind(this);

        this.state = {
            visible: false,
        };
    };

    showModal = () => {
        this.setState({ visible: true });
    };

    onConfirm() {
        const id = this.props.data._id;
        confirm({
            title: `确定要删除${this.props.data.keywords}?`,
            onOk: () => {
                this.props.onDelete(id, this.props.index);
            },
            // onCancel() {
            //     console.log('Cancel');
            // },
        });
    }

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCreate = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            this.props[this.props.methodName](this.props.data, values, this.props.index);
            form.resetFields();
            this.setState({ visible: false });
        });
    };

    saveFormRef = (form) => {
        this.form = form;
    };

    render() {
        let zujian;
        if (this.props.onDelete) {
            zujian= <Button style={deleteStyle} type="danger" onClick={this.onConfirm}>删除</Button>;
        }
        let addStyle = {};
        if (this.props.onAdd) {
            addStyle = {
                "marginLeft": "10%",
                "marginTop": "2%"
            };
        }
        return (
            <div>
                <Button style={addStyle} type="primary" onClick={this.showModal}>{this.props.name}</Button>
                <CollectionCreateForm
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    data={this.props.data || {}}
                    name={this.props.name}
                    title={this.props.title}
                />
                {zujian}
            </div>
        );
    }
}

export default CollectionsPage;