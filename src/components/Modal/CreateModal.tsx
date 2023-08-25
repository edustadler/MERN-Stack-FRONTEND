import React, { useState } from 'react';
import { Modal, Input, Select } from 'antd';
import { FormModal, FormWrap2 } from './styled';

interface createProps {
    openModal?: string;
    visible?: boolean;
    onOk?: any;
    onCancel?: any;
    loading?: any
}

export const CreateModal: React.FC<createProps> = ({ visible, onOk, onCancel, loading }) => {

    const [title, setTitle] = useState('')
    const [type, setType] = useState('')
    const [category, setCategory] = useState('')
    const [value, setValue] = useState('')

    return (
        <>
            <Modal
                title="New"
                open={visible}
                onOk={onOk}
                confirmLoading={loading}
                onCancel={onCancel}
                width={'31.25rem'}
                bodyStyle={{ paddingTop: '1rem' }}
            >
                <FormModal>
                    <FormWrap2>
                        <Input
                            placeholder='Title'
                            name='title'
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                        <Select style={{ width: '45%' }} placeholder='Type' filterOption={true} onChange={(value) => setType(value)} value={type}>
                            <Select.Option value="incoming" >Incoming</Select.Option>
                            <Select.Option value="expense">Expense</Select.Option>
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
                            placeholder='Only include the value'
                            type='number'
                            onChange={(e) => setValue(e.target.value)}
                            value={value}
                        />
                    </FormWrap2>
                </FormModal>
            </Modal>
        </>
    )
}