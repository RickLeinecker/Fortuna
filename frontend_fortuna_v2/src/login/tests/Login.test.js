import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Login from './../Login';

it('checkLoginRender', () => {
  const { queryByTitle } = render(<Login />);
  const leader = queryByTitle("leaderboardTest");

  expect(leader).toBeTruthy();
  
})

it('loginright', () => {
  const { queryByTitle } = render(<Login />);
  const loginright = queryByTitle("loginright");

  expect(loginright).toBeTruthy();
  
})

it('info', () => {
  const { queryByTitle } = render(<Login />);
  const info = queryByTitle("fortunainfo");

  expect(info).toBeTruthy();
  
})