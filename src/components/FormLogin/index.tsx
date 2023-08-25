
import React, { useState } from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginFormWrapper } from './styled';
import { NewUser } from '../Modal/NewUser';
import { useSignin } from '../../hooks/useSignin';



export const FormLogin: React.FC = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [loadings, setLoadings] = useState<boolean[]>([]);
    const { signin, error, isLoading } = useSignin()

    const onCreate = (values: any) => {
        console.log('Received values of form: ', values, username, password);
        setOpen(false);
    };

    const onLogin = async (values: any) => {
        console.log('onlogin', values)
        await signin(values)
    };

    const onFinish = (values: any) => {
        console.log('Successo:', values);
        form.validateFields().then((values) => {
            form.resetFields();
            enterLoading(0)
            onLogin(values);
        }).catch((info) => {
            console.log('Validate Failed:', info);
        });
    };

    const enterLoading = (index: number) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });

        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 6000);
    };

    return (
        <>
            <LoginFormWrapper>

                <NewUser
                    open={open}
                    onCreate={() => onCreate}
                    onCancel={() => {
                        setOpen(false);
                    }}
                />

                <Form
                    form={form}
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="Username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                        validateStatus={error && error.includes('username') ? 'error' : ''}
                        help={error && error.includes('username') ? 'Invalid username' : ''}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Form.Item>
                    <Form.Item
                        name="Password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                        validateStatus={error && error.includes('password') ? 'error' : ''}
                        help={error && error.includes('password') ? 'Invalid password' : ''}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" loading={isLoading ? loadings[0] : false}>
                            Log in
                        </Button>
                        Or <span
                            style={{ color: '#4096ff', cursor: 'pointer' }}
                            onClick={
                                () => {
                                    setOpen(true);
                                }
                            }
                        >
                            register now!
                        </span>
                    </Form.Item>
                </Form>
            </LoginFormWrapper>
        </>
    )
}