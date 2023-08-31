import React, { useState } from 'react';
import { Modal, Input, Select, Form } from 'antd';
import { FormModal, FormWrap2 } from './styled';
import Controller from '../../config/controllers/controller';

interface createProps {
    openModal?: string;
    visible?: boolean;
    onOk?: any;
    onCancel?: any;
    loading?: any
}

interface FormDataItem {
    title: string;
    category: string;
    type: string;
    value: number;
}

export const CreateModal: React.FC<createProps> = ({ visible, onCancel, loading }) => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [title, setTitle] = useState('')
    const [type, setType] = useState('')
    const [category, setCategory] = useState('')
    const [value, setValue] = useState('')
    const [formData, setFormData] = useState<FormDataItem[]>([]);
    const [form] = Form.useForm();

    const addNewCrud = (newData: FormDataItem) => {
        setFormData(prevCrudData => [...prevCrudData, newData]);
    };

    const onOk = async () => {
        try {
            const formDataWithDate = {
                title: title || "No Name",
                category: category || "General",
                type: type,
                value: parseFloat(value),
            };

            const response = await Controller.createData({ data: formDataWithDate });
            if (response.status === 200) {
                addNewCrud(response.data);
                console.log(formData)
                onCancel();
            }
        } catch (error) {
            console.error("Error creating data:", error);
            console.log(formData)
        }
    }

    return (
        <>
            <Modal
                title="New"
                open={visible}
                onOk={() => form.submit()}
                confirmLoading={loading}
                onCancel={onCancel}
                width={'31.25rem'}
                bodyStyle={{ paddingTop: '1rem' }}
            >
                <Form form={form} onFinish={onOk}>
                    <FormWrap2>
                        <Input
                            placeholder='Title'
                            name='title'
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                        <Select style={{ width: '45%' }} placeholder='Type' filterOption={true} onChange={(value) => setType(value)} value={type}>
                            <Select.Option value="Incoming" >Incoming</Select.Option>
                            <Select.Option value="Expense">Expense</Select.Option>
                        </Select>
                    </FormWrap2>
                    <FormWrap2 direction={'column'}>
                        <Input
                            placeholder='Category'
                            name='category'
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                        />
                        <Input
                            name='value'
                            placeholder='Only include the value'
                            type='number'
                            onChange={(e) => setValue(e.target.value)}
                            value={value}
                        />
                    </FormWrap2>
                </Form>
            </Modal>
        </>
    )
}