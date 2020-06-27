import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MessageWrapper = styled.div`
  width: 100%;
  height: 4rem;
  background-color: ${({ msgStyle }) =>
    msgStyle === 'success' ? '#3cb371' : '#33A1DE'};
  border-left: 0.5rem solid
    ${({ msgStyle }) => (msgStyle === 'success' ? 'darkgreen' : 'darkblue')};
  color: #fafafa;
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: ${({ cart }) => (cart ? 'space-between' : 'flex-start')};
  display: ${({ visible }) => (visible ? 'flex' : 'none')};

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

const Message = ({ visible, msgStyle, text, cart }) => (
  <MessageWrapper visible={visible} msgStyle={msgStyle} cart={cart}>
    <p>{text}</p>
    {cart && <Link to='/cart'>Pregled korpe →</Link>}
  </MessageWrapper>
);

export default Message;
