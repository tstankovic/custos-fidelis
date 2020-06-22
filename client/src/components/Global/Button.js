import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.button`
  margin-left: 1.5rem;
  padding: 0 2rem;
  border: none;
  border-radius: 2px;
  outline: none;
  background-color: ${(props) => (props.disabled ? '#aaa' : '#333')};
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

const Button = (props) => (
  <ButtonWrapper {...props}>{props.children}</ButtonWrapper>
);

export default Button;
