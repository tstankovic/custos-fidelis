import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MessageWrapper = styled.div`
  width: 100%;
  height: 4rem;
  background-color: #3cb371;
  color: #fafafa;
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  display: ${(props) => (props.visible ? 'flex' : 'none')};

  p {
    padding-left: 1.5rem;
  }

  a {
    padding-left: 1rem;
    padding-right: 1.5rem;
    font-weight: bold;
    color: #fafafa;
    border-left: 2px solid #fafafa;
  }
`;

const Message = ({ visible }) => (
  <MessageWrapper visible={visible}>
    <p>Производ успешно додат у корпу</p>
    <Link to='/cart'>Преглед корпе →</Link>
  </MessageWrapper>
);

export default Message;