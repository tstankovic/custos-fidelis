import React from 'react';
import styled from 'styled-components';

const TitleWrapper = styled.h1`
  padding: 5rem 0;
  text-align: center;
  font-size: 2.5rem;
  font-weight: 300;
`;

const Title = ({ title }) => <TitleWrapper>{title}</TitleWrapper>;

export default Title;
