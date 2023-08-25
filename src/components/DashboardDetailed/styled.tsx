import styled from 'styled-components';
import { Content } from "antd/es/layout/layout";


export const TableContent = styled(Content)`
  margin: 1.5rem 1rem;
  padding: 0 .625rem;
  min-height: 12.5rem;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0px 0px 0.625rem 0.25rem #00000069;
  overflow: hidden;
  overflow-y: auto;



  &::-webkit-scrollbar {
  border-radius: 60px;
  border: 1px solid transparent;
  height: 50px;
  }
  &::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
  
  @media (max-width: 576px) {
      padding: 0;
      border-radius: 5px;
      overflow-x: scroll;
  }
`;
