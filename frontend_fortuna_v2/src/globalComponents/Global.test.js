import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Leaderboard from './Leaderboard';
import MainNavbar from './MainNavbar';
import SelectTank from './SelectTank';

import { BrowserRouter } from 'react-router-dom';

it('leaderRoot', () => {
  const { queryByTitle } = render(
    <Leaderboard/>
  )

  const leader = queryByTitle("leaderRoot");

  expect(leader).toBeTruthy();
});

it('navRoot', () => {
  const { queryByTitle } = render(
    <BrowserRouter>
      <MainNavbar/>
    </BrowserRouter>
  )

  const root = queryByTitle("navRoot");

  expect(root).toBeTruthy();
});

it('navLeft', () => {
  const { queryByTitle } = render(
    <BrowserRouter>
      <MainNavbar/>
    </BrowserRouter>
  )

  const left = queryByTitle("navLeft");

  expect(left).toBeTruthy();
});

it('navMid', () => {
  const { queryByTitle } = render(
    <BrowserRouter>
      <MainNavbar/>
    </BrowserRouter>
  )

  const mid = queryByTitle("navMid");

  expect(mid).toBeTruthy();
});

it('navRight', () => {
  const { queryByTitle } = render(
    <BrowserRouter>
      <MainNavbar/>
    </BrowserRouter>
  )

  const right = queryByTitle("navRight");

  expect(right).toBeTruthy();
});

it('tankRoot', () => {
  const { queryByTitle } = render(
    <SelectTank/>
  )

  const tank = queryByTitle("tankRoot");

  expect(tank).toBeTruthy();
});