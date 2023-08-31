import React, { useEffect, useState } from 'react'
import { Layout, Menu, Button, Row, Col, Table, Space } from 'antd';
import { DeleteOutlined, FormOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MinusCircleOutlined, PlusCircleOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { SideAvatar } from '../Avatar';
import { TableContent } from './styled';
import Column from 'antd/es/table/Column';
import { UpdateModal } from '../Modal/UpdateModal';
import { LogoutButton } from '../LogoutButton';
import { useFetchCrud } from '../../hooks/useFetchCrud';
import Controller from '../../config/controllers/controller';




export const DashboardDetailed: React.FC<{ setSelectedItem: string; onBackToGeneral: () => void }> = ({ setSelectedItem, onBackToGeneral }) => {

    const [collapsed, setCollapsed] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState(setSelectedItem || '1');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [refreshFlag, setRefreshFlag] = useState(0);
    const { Header, Sider } = Layout
    const { data, setData } = useFetchCrud();

    const refetchData = () => {
        setRefreshFlag(refreshFlag + 1);
    };

    const handleDelete = async (record: any) => {
        try {
            await Controller.deleteData({ id: record._id });
            setRefreshFlag(refreshFlag + 1); // Trigger useEffect by incrementing refreshFlag
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const fetchedData = await Controller.getData();
            setData(fetchedData);
        };

        fetchData();
    }, [refreshFlag]);

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


    return (
        <>
            <Layout style={{ height: '100vh', }}>
                <Sider trigger={null} collapsible collapsed={collapsed} style={{ height: '100vh' }}>
                    <SideAvatar />
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        selectedKeys={[selectedMenuItem]}
                        onSelect={(item) => setSelectedMenuItem(item.key)}
                        items={[
                            {
                                key: '1',
                                icon: <PlusCircleOutlined />,
                                label: 'Income',
                            },
                            {
                                key: '2',
                                icon: <MinusCircleOutlined />,
                                label: 'Expense',
                            },
                            {
                                key: '3',
                                icon: <VideoCameraOutlined />,
                                label: 'All',
                            },

                        ]}
                    />
                    <LogoutButton />
                </Sider>
                <Layout style={{ background: '#b0b5b9' }}>
                    <Header style={{ padding: 0, background: '#b0b5b9', position: 'absolute' }}>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '20px',
                                width: 64,
                                height: 64,
                            }}
                        />
                    </Header>
                    <Row gutter={10} style={{ width: '99.5%', padding: '1.0625rem 0' }} justify={'end'}>
                        <Col>
                            <Button onClick={onBackToGeneral}>Back</Button>
                        </Col>
                    </Row>
                    <TableContent>
                        {
                            selectedMenuItem === '3' &&
                            (
                                <Table dataSource={data} pagination={false}>
                                    <Column title="Title" dataIndex="title" key="title" />
                                    <Column title='Value' dataIndex='value' key='value' render={(text, record) => `$${parseFloat(text).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} />
                                    <Column title="Category" dataIndex="category" key="category" />
                                    <Column title="Type" dataIndex="type" key="type" />
                                    <Column title="Date" dataIndex="date" key="date" render={(text, record) => new Date(text).toLocaleDateString('en-GB')} />
                                    <Column
                                        title="Action"
                                        key="action"
                                        width={20}
                                        render={(_: any, record: any) => (
                                            <>
                                                <Space>
                                                    <Button type="primary" onClick={showModal}><FormOutlined /></Button>
                                                    <Button type="primary" danger onClick={() => handleDelete(record)}><DeleteOutlined /></Button>
                                                </Space>
                                            </>
                                        )}
                                    />

                                </Table>
                            )
                        }

                        {
                            selectedMenuItem === '1' && (
                                <Table dataSource={data.filter((item: { type: string; }) => item.type === 'Incoming')} pagination={false}>
                                    <Column title="Title" dataIndex="title" key="title" />
                                    <Column title='Value' dataIndex='value' key='value' render={(text, record) => `$${parseFloat(text).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} />
                                    <Column title="Category" dataIndex="category" key="category" />
                                    <Column title="Type" dataIndex="type" key="type" />
                                    <Column title="Date" dataIndex="date" key="date" render={(text, record) => new Date(text).toLocaleDateString('en-GB')} />
                                    <Column
                                        title="Action"
                                        key="action"
                                        width={20}
                                        render={(_: any, record: any) => (
                                            <>
                                                <Space>
                                                    <Button type="primary" onClick={showModal}><FormOutlined /></Button>
                                                    <Button type="primary" danger onClick={() => handleDelete(record)}><DeleteOutlined /></Button>
                                                </Space>
                                            </>
                                        )}
                                    />

                                </Table>
                            )
                        }

                        {
                            selectedMenuItem === '2' && (
                                <Table dataSource={data.filter((item: { type: string; }) => item.type === 'Expense')} pagination={false}>
                                    <Column title="Title" dataIndex="title" key="title" />
                                    <Column title='Value' dataIndex='value' key='value' render={(text, record) => `$${parseFloat(text).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} />
                                    <Column title="Category" dataIndex="category" key="category" />
                                    <Column title="Type" dataIndex="type" key="type" />
                                    <Column title="Date" dataIndex="date" key="date" render={(text, record) => new Date(text).toLocaleDateString('en-GB')} />
                                    <Column
                                        title="Action"
                                        key="action"
                                        width={20}
                                        render={(_: any, record: any) => (
                                            <>
                                                <Space>
                                                    <Button type="primary" onClick={showModal}><FormOutlined /></Button>
                                                    <Button type="primary" danger onClick={() => handleDelete(record)}><DeleteOutlined /></Button>
                                                </Space>
                                            </>
                                        )}
                                    />
                                </Table>
                            )
                        }
                    </TableContent>
                </Layout>
            </Layout>

            <UpdateModal visible={isModalVisible} onOk={handleModalOk} onCancel={handleModalCancel} loading={confirmLoading} />
        </>
    );
}
