import { Col, Row } from 'antd'
import React from 'react'
import { FormLogin } from '../../components/FormLogin'
import { Container, FlexCenterBlock, Section, Title2 } from '../../styles/global'
import signinGif from '../../assets/images/signin.gif'

export const Login: React.FC = () => {
    return (
        <>
            <Section background='linear-gradient(90deg, #ffffff 51%, #001529 50%)'>
                <Container padding='0' height='70%' borderRadius='10px'>
                    <Row style={{height:'100%'}}>
                        <Col span={12} style={{background: '#001529', display: 'flex', justifyContent:'center', alignItems: 'center'}}>
                            {/* <FlexCenterBlock padding='0 3.75rem'>
                                <Title textAlign={'center'} color='#fff'>FinancialData</Title>
                                <Title2 textAlign={'center'} color='#fff' margin={'-.9375rem 0 0 0'}>development mode</Title2>
                                <Paragraph textAlign={'center'} color='#fff' margin='1.25rem 0 0 0'>This is a study about react, typescript, mongodb and REST Api</Paragraph>
                            </FlexCenterBlock> */}
                            <img src={signinGif} alt='test'/>
                        </Col>
                        <Col span={12} style={{padding: '1.5625rem', background: '#fff'}}>
                            <FlexCenterBlock padding='0 3.75rem'>
                                <Title2 textAlign={'center'}>Login</Title2>
                                <FormLogin />
                            </FlexCenterBlock>
                        </Col>
                    </Row>
                </Container>
            </Section>
        </>
    )
}
