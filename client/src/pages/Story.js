import React from 'react';
import styled from 'styled-components';

import Title from '../components/Global/Title';

const StoryWrapper = styled.main`
  // background-color: lightcyan;
`;

const Story = () => (
  <StoryWrapper>
    <Title title='Прича' />
  </StoryWrapper>
);

export default Story;
