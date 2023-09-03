import React, { useEffect, useState } from 'react';
import { Modal, Input, Select } from 'antd';
import { FormModal, FormWrap2 } from './styled';

interface updateProps {
    openModal?: string;
    visible?: boolean;
    onOk?: any;
    onCancel?: any;
    loading?: any;
    selectedItemData: any
}

export const UpdateModal: React.FC<updateProps> = ({ visible, onOk, onCancel, loading, selectedItemData }) => {

    const [formData, setFormData] = useState(selectedItemData || {});

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        // Update the formData when selectedItemData changes
        setFormData(selectedItemData);
    }, [selectedItemData]);

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
                            value={formData?.title}
                            onChange={handleInputChange}
                        />
                        <Select style={{ width: '45%' }} placeholder='Type' value={formData?.type || ''} onChange={(value) => setFormData({ ...formData, type: value })}>
                            <Select.Option value="incoming" >Incoming</Select.Option>
                            <Select.Option value="expense">Expense</Select.Option>
                        </Select>
                    </FormWrap2>
                    <FormWrap2 direction='column'>
                        <Input
                            placeholder='Category'
                            name='category' value={formData?.category || ''}
                            onChange={(value) => setFormData({ ...formData, category: value })}
                        />
                        <Input
                            placeholder='Value'
                            type='number'
                            value={formData?.value || ''}
                            onChange={(v) => setFormData({ ...formData, value: v })}
                        />
                    </FormWrap2>
                </FormModal>
            </Modal>
        </>
    )
}