import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Login from './../Login';

it('checkLoginRender', () => {
  const { queryByTitle } = render(<Login />);
  const leader = queryByTitle("leaderboardTest");

  expect(leader).toBeTruthy();
  
})