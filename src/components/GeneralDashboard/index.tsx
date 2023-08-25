import React, { useState } from "react";
import { TotalCard } from "../TotalCard";
import { Button, Col, Layout, Row } from 'antd'
import { SideAvatar } from "../Avatar";
import { Paragraph } from "../../styles/global";
import { PlusOutlined } from "@ant-design/icons";
import { CreateModal } from "../Modal/CreateModal";
import { useAppContext } from "../../config/context/hook";
import { LogoutButton } from "../LogoutButton";


export const GeneralDashboard: React.FC<{
    onCardClick: (selectedMenuItem: string) => void;
}> = ({ onCardClick }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const { data } = useAppContext()

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleModalOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setIsModalVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const { Sider, Content } = Layout

    // Calculate totals
    let incomingTotal = 0;
    let expenseTotal = 0;

    data.forEach((item) => {
        if (item.type === 'Incoming') {
            incomingTotal += item.value;
        } else if (item.type === 'Expense') {
            expenseTotal += item.value;
        }
    });

    const total = incomingTotal - expenseTotal;



    return (
        <>
            <Layout style={{ height: '100vh' }}>
                <Sider trigger={null} style={{ height: '100vh' }}>
                    <SideAvatar />
                    <LogoutButton/>
                </Sider>
                <Layout style={{ padding: '4rem' }}>
                    <Content>
                        <Row gutter={0} style={{ width: '100%', marginBottom: '1rem' }}>
                            <Col xxl={{ span: 4, push: 3 }}>
                                <Button style={{ width: '100%' }} onClick={showModal}>New movement <PlusOutlined /></Button>
                            </Col>
                        </Row>
                        <Row gutter={20} justify={'center'} style={{ marginBottom: '1.25rem' }}>

                            <React.Fragment>
                                <Col xl={{ span: 8 }} xxl={{ span: 6 }}>
                                    <TotalCard State={'Incoming'} Click={() => onCardClick('1')}>
                                        {`$ ${incomingTotal.toFixed(2)}`}
                                    </TotalCard>
                                </Col>
                            </React.Fragment>
                            <React.Fragment>
                                <Col xl={{ span: 8 }} xxl={{ span: 6 }}>
                                    <TotalCard State={'Expenses'} Click={() => onCardClick('2')}>
                                        {`$ ${expenseTotal.toFixed(2)}`}
                                    </TotalCard>
                                </Col>
                            </React.Fragment>
                            <React.Fragment>
                                <Col xl={{ span: 8 }} xxl={{ span: 6 }}>
                                    <TotalCard State={'Total'} Click={() => onCardClick('3')} Type={total >= 0 ? "Incoming" : "Expense"}>
                                        {`$ ${total.toFixed(2)}`}
                                    </TotalCard>
                                </Col>
                            </React.Fragment>
                        </Row >
                        <Row>
                            <Col span={5} offset={18}>
                                <Paragraph>Click to see the selected data</Paragraph>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </Layout>

            <CreateModal visible={isModalVisible} onOk={handleModalOk} onCancel={handleModalCancel} loading={confirmLoading} />
        </>
    )
}