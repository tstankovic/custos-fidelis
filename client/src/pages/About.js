import React from 'react';
import styled from 'styled-components';

import Title from '../components/Global/Title';

const AboutWrapper = styled.main`
  // background-color: lightcyan;
`;

const About = () => (
  <AboutWrapper>
    <Title title='O nama' />
  </AboutWrapper>
);

export default About;
