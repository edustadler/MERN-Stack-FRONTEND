import React from 'react';
import { Modal, Input, Select } from 'antd';
import { FormModal, FormWrap2 } from './styled';

interface updateProps {
    openModal?: string;
    visible?: boolean;
    onOk?: any;
    onCancel?: any;
    loading?: any
}

export const UpdateModal: React.FC<updateProps> = ({ visible, onOk, onCancel, loading }) => {

    return (
        <>
            <Modal
                title="Update"
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
                        />
                        <Select style={{ width: '45%' }} placeholder='Type'>
                            <Select.Option value="incoming" >Incoming</Select.Option>
                            <Select.Option value="expense">Expense</Select.Option>
                        </Select>
                    </FormWrap2>
                    <FormWrap2 direction='column'>
                        <Input
                            placeholder='Category'
                            name='category'
                        />
                        <Input
                            placeholder='Value'
                            type='number'
                        />
                    </FormWrap2>
                </FormModal>
            </Modal>
        </>
    )
}