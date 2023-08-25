import { styled } from "styled-components";

interface ParagraphProps {
    fontSize?: string
    color?: string
    textAlign?: string
    margin?: string
}

interface LayoutProps {
    height?: string
    display?: string
    padding?:string
    borderRadius?: string
    background?: string
    color?: string
    textAlign?: string
}

export const Title = styled.h1<ParagraphProps>`
    font-size: ${(props) => props.fontSize || '2.65rem'};
    color: ${(props) => props.color};
    text-align: ${(props) => props.textAlign};
    margin:${(props) =>props.margin};
`

export const Title2 = styled.h2<ParagraphProps>`
    font-size: ${(props) => props.fontSize || '2rem'};
    color: ${(props) => props.color || '#001529'};
    text-align: ${(props) => props.textAlign};
    margin: ${(props) => props.margin || '1.25rem 0'};
`

export const Paragraph = styled.p<ParagraphProps>`
    font-size: ${(props) => props.fontSize || '1rem'};
    color: ${(props) => props.color};
    text-align: ${(props) => props.textAlign};
    margin:${(props) =>props.margin};
`

export const Section = styled.section<LayoutProps>`
    height: ${(props) => props.height || '100vh'};
    display: ${(props) => props.display || 'flex'};
    background: ${(props) => props.background};

`

export const Container = styled.div<LayoutProps>`
    width: 71.25rem;
    height: ${(props) => props.height};
    margin: auto;
    box-shadow: 0px 0px 10px 1px #000;
    border-radius: ${(props)=> props.borderRadius};
    padding: ${(props) => props.padding || '1.5625rem'};
    overflow: hidden;
`

export const FlexCenterBlock = styled.div<LayoutProps>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: ${(props) => props.padding};
    color: ${(props) => props.color};
    text-align: ${(props) => props.textAlign};
`