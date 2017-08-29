import { Form, Icon, Input, Button } from 'antd';
import React, {Component} from "react";
import 'antd/lib/icon/style/css';
const FormItem = Form.Item;

const WrappedNormalLoginForm = Form.create()(
    (props) => {
        const { form, onLogin } = props;
        const {getFieldDecorator} = form;
        const handleSubmit = (e) => {
            e.preventDefault();
            form.validateFields((err, values) => {
                if (!err) {
                    onLogin(values);
                }
            });
        }
        return (
            <Form onSubmit={handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入账户!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                </FormItem>
            </Form>
        );
    }
);

class login extends Component {

    render() {
        return (
            <div>
                <WrappedNormalLoginForm
                    onLogin={this.props.onLogin} />
            </div>
        )
    }
}

export default login;