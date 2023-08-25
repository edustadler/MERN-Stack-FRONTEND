import React, { useState } from 'react';
import { Form, Input, Modal } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { UserWrap } from './styled';
import { useSignup } from '../../hooks/useSignup';


interface Values {
    title: string;
    description: string;
    modifier: string;
}

interface CollectionCreateFormProps {
    open: boolean;
    onCreate: (values: Values) => void;
    onCancel: () => void;
}

export const NewUser: React.FC<CollectionCreateFormProps> = ({ open, onCreate, onCancel }) => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const { signup, error, isLoading } = useSignup()
    const [form] = Form.useForm();

    const handleSubmit = async (values: any) => {
        await signup(values)
    }

    return (
        <Modal
            open={open}
            title="New user"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {

                        handleSubmit(values)
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }
            }
            width={'31.25rem'}
            bodyStyle={{ paddingTop: '1rem' }}
        >
            <Form form={form} name="horizontal_login">
                <UserWrap marginB={'0'}>
                    <Form.Item
                        name="Email"
                        rules={[{ required: true, message: 'Please insert your E-mail!' }]}
                        validateStatus={error && error.includes('email') ? 'error' : ''}
                        help={error && error.includes('email') ? 'Email is already in use' : ''}
                        style={{ width: '100%' }}
                    >
                        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} value={email} />
                    </Form.Item>
                </UserWrap>
                <UserWrap marginB={'0'}>
                    <Form.Item
                        name="Name"
                        rules={[{ required: true, message: 'Please insert your Name!' }]}
                        style={{ width: '100%' }}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} />
                    </Form.Item>
                    <Form.Item
                        name="Username"
                        rules={
                            [
                                {
                                    required: true,
                                    message: 'Please create your username!'
                                },
                                {
                                    min: 6,
                                    max: 16,
                                    message: 'Username must be between 6 and 16 characters'
                                }
                            ]
                        }
                        style={{ width: '100%' }}
                        validateStatus={error && error.includes('Username') ? 'error' : ''}
                        help={error && error.includes('Username') ? 'Username is already in use' : ''}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} />
                    </Form.Item>
                </UserWrap>
                <UserWrap marginB={'0'}>
                    <Form.Item
                        name="Password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                        style={{ width: '100%' }}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </Form.Item>
                </UserWrap>
                <UserWrap marginB={'0'}>
                    <Form.Item
                        name="Confirm"
                        dependencies={['Password']}
                        rules={[
                            { required: true, message: 'Please repeat your password!' },
                            (
                                { getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('Password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The password do not match!'));
                                    },
                                }
                            ),
                        ]}
                        style={{ width: '100%' }}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Confirm your Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                        />
                    </Form.Item>
                </UserWrap>
            </Form>
        </Modal>
    );
};