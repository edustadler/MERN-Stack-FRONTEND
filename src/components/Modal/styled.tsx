import { styled } from "styled-components";

interface Iflex {
    direction?: string
    marginB?: string
}


export const OverlayModal = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, .7);
`


export const FormModal = styled.form`

`

export const FormWrap2 = styled.div<Iflex>`
    width: 100%;
    display: flex;
    gap: .625rem;
    margin-bottom: ${(props) => props.marginB || '.625rem'};
    flex-direction: ${(props) => props.direction};
`

export const UserWrap = styled(FormWrap2)`
    .ant-form-item {
        margin-bottom: 1.125rem;
    }
`