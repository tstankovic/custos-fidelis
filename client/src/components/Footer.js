import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  width: 100%;
  height: 30vh;
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    padding-top: 5rem;
  }
`;

const Footer = () => (
  <FooterWrapper>
    <p>&copy; 2020 Custos Fidelis. All rights reserved.</p>
  </FooterWrapper>
);

export default Footer;
