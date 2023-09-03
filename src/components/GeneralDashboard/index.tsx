import React, { useEffect, useState } from "react";
import { TotalCard } from "../TotalCard";
import { Button, Col, Layout, Row } from 'antd'
import { SideAvatar } from "../Avatar";
import { Paragraph } from "../../styles/global";
import { PlusOutlined } from "@ant-design/icons";
import { CreateModal } from "../Modal/CreateModal";
/* import { useAppContext } from "../../config/context/hook"; */
import { LogoutButton } from "../LogoutButton";
import { useFetchCrud } from "../../hooks/useFetchCrud";
import Controller from "../../config/controllers/controller";

interface Item {
    title: string;
    type: string;
    category: string;
    value: number;
}

export const GeneralDashboard: React.FC<{
    onCardClick: (selectedMenuItem: string) => void;
}> = ({ onCardClick }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [data, setData] = useState<Item[]>([]);


    const fetchData = async () => {
        try {
            const fetchedData = await Controller.getData();
            setData(fetchedData);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLoading = () => {
        setConfirmLoading(confirmLoading)
    }

    const showModal = () => {
        setIsModalVisible(true);

    };



    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const { Sider, Content } = Layout

    // Calculate totals
    const incomingTotal = data
        .filter(item => item.type === 'Incoming')
        .reduce((total, item) => total + item.value, 0);

    const expenseTotal = data
        .filter(item => item.type === 'Expense')
        .reduce((total, item) => total + item.value, 0);

    const total = incomingTotal - expenseTotal;

    useEffect(() => {
        fetchData();
    }, [isModalVisible]);


    return (
        <>
            <Layout style={{ height: '100vh' }}>
                <Sider trigger={null} style={{ height: '100vh' }}>
                    <SideAvatar />
                    <LogoutButton />
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
                                    <TotalCard State={'Incoming'} Click={() => onCardClick('1')} isLoading={!data.length}>
                                        {`$ ${incomingTotal.toFixed(2)}`}
                                    </TotalCard>
                                </Col>
                            </React.Fragment>
                            <React.Fragment>
                                <Col xl={{ span: 8 }} xxl={{ span: 6 }}>
                                    <TotalCard State={'Expenses'} Click={() => onCardClick('2')} isLoading={!data.length}>
                                        {`$ ${expenseTotal.toFixed(2)}`}
                                    </TotalCard>
                                </Col>
                            </React.Fragment>
                            <React.Fragment>
                                <Col xl={{ span: 8 }} xxl={{ span: 6 }}>
                                    <TotalCard State={'Total'} Click={() => onCardClick('3')} Type={total >= 0 ? "Incoming" : "Expense"} isLoading={!data.length}>
                                        {`$ ${total.toFixed(2)}`}
                                    </TotalCard>
                                </Col>
                            </React.Fragment>
                        </Row >
                        <Row gutter={0}>
                            <Col xl={{ span: 24 }} xxl={{ span: 16, push: 3 }}>
                                <Paragraph>Click on the box for detailed information.</Paragraph>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </Layout>

            <CreateModal visible={isModalVisible} onCancel={handleModalCancel} loading={confirmLoading} />
        </>
    )
}