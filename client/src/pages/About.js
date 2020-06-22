import React from 'react';
import styled from 'styled-components';

import Title from '../components/Global/Title';

const AboutWrapper = styled.main`
  // background-color: lightcyan;
`;

const About = () => (
  <AboutWrapper>
    <Title title='О нама' />
  </AboutWrapper>
);

export default About;
