import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Leaderboard from './Leaderboard';
import MainNavbar from './MainNavbar';
import SelectTank from './SelectTank';

import { BrowserRouter } from 'react-router-dom';

it('leaderRoot', () => {
  const { getByTestId } = render(
    <Leaderboard/>
  )

  const leader = getByTestId("leaderRoot");

  expect(leader).toBeTruthy();
});

it('navRoot', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <MainNavbar/>
    </BrowserRouter>
  )

  const root = getByTestId("navRoot");

  expect(root).toBeTruthy();
});

it('navLeft', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <MainNavbar/>
    </BrowserRouter>
  )

  const left = getByTestId("navLeft");

  expect(left).toBeTruthy();
});

it('navMid', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <MainNavbar/>
    </BrowserRouter>
  )

  const mid = getByTestId("navMid");

  expect(mid).toBeTruthy();
});

it('navRight', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <MainNavbar/>
    </BrowserRouter>
  )

  const right = getByTestId("navRight");

  expect(right).toBeTruthy();
});

it('tankRoot', () => {
  const { getByTestId } = render(
    <SelectTank/>
  )

  const tank = getByTestId("tankRoot");

  expect(tank).toBeTruthy();
});