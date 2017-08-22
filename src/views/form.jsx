import { Button, Modal, Form, Input } from 'antd';
import React, {Component} from "react";
import 'antd/lib/form/style/css';
import 'antd/lib/modal/style/css';
import 'antd/lib/button/style/css';
import $ from "jquery";
const FormItem = Form.Item;

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
                            <Input type="textarea" />
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

        this.state = {
            visible: false,
        };
    };

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCreate = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            // if () {
            //
            // }

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });
        });
    };

    saveFormRef = (form) => {
        this.form = form;
    };

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>{this.props.name}</Button>
                <CollectionCreateForm
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    data={this.props.data}
                    name={this.props.name}
                    title={this.props.title}
                />
            </div>
        );
    }
}

export default CollectionsPage;