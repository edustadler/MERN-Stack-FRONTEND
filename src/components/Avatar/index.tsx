import React from 'react'
import { Image } from 'antd'
import { Paragraph } from '../../styles/global'
import { AvatarSection } from './styled'


export const SideAvatar = () => {
    return (
        <>
            <AvatarSection>
                <Image
                    width={"100%"}
                    src="https://t3.ftcdn.net/jpg/01/18/01/98/360_F_118019822_6CKXP6rXmVhDOzbXZlLqEM2ya4HhYzSV.jpg"
                    preview={true}
                    style={
                        {
                            margin: '1.25rem auto .625rem auto',
                            borderRadius: '100%',
                            width: '70%',
                            display: 'block'
                        }
                    }
                />
                <Paragraph color={'#fff'} textAlign={'center'}>Howdy</Paragraph>
            </AvatarSection>
        </>
    )
}