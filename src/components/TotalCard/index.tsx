import { Card } from 'antd'
import React from 'react'
import { Title } from '../../styles/global'
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'

interface CardProps {
    Click?: () => void
    State?: string
    Type?: string
    children?: string | number
}


export const TotalCard: React.FC<CardProps> = ({ Click, State, children, Type }: CardProps) => {

    return (<>

        {State === 'Incoming' &&
            <Card onClick={Click} title="Incoming:" extra={<PlusCircleOutlined style={{ color: '#1765ae' }} />} headStyle={{ color: '#1765ae' }} bordered={false} style={{ cursor: 'pointer' }}>

                <Title color='#1765ae'>
                    {children}
                </Title>
            </Card>
        }

        {State === 'Expenses' &&
            <Card onClick={Click} title="Expense:" extra={<MinusCircleOutlined style={{ color: '#ae4b17' }} />} headStyle={{ color: '#ae4b17' }} bordered={false} style={{ cursor: 'pointer' }}>
                <Title color='#ae4b17'>
                    {children}
                </Title>
            </Card>
        }

        {
            State === 'Total' ? (
                Type === 'Incoming'
                    ? (
                        <Card onClick={Click} title="Total:" extra={<PlusCircleOutlined style={{ color: '#1765ae' }} />} headStyle={{ color: '#1765ae' }} bordered={false} style={{ cursor: 'pointer' }}>

                            <Title color='#1765ae'>
                                {children}
                            </Title>
                        </Card>
                    ) : (
                        <Card onClick={Click} title="Total:" extra={<MinusCircleOutlined style={{ color: '#ae4b17' }} />} headStyle={{ color: '#ae4b17' }} bordered={false} style={{ cursor: 'pointer' }}>
                            <Title color='#ae4b17'>
                                {children}
                            </Title>
                        </Card>
                    )
            ) : null
        }
    </>
    )
}