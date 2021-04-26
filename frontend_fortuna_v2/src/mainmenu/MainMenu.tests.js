import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import MainMenu from './MainMenu';

import { BrowserRouter } from 'react-router-dom';

it('mainMenuRoot', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <MainMenu/>
    </BrowserRouter>
  );

  const root = getByTestId("mainMenuRoot");
  expect(root).toBeTruthy();
});

it('mainMenuHelp', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <MainMenu/>
    </BrowserRouter>
  );

  const help = getByTestId("helpBtn");
  expect(help).toBeTruthy();
})

it('battleRecord', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <MainMenu/>
    </BrowserRouter>
  );

  const battle = getByTestId("mainBattle");
  expect(battle).toBeTruthy();
})

it('mainMid', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <MainMenu/>
    </BrowserRouter>
  );

  const mid = getByTestId("mainMenuMid");
  expect(mid).toBeTruthy();
})

it('mainMenuTank', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <MainMenu/>
    </BrowserRouter>
  );

  const tank = getByTestId("tankDisplay");
  expect(tank).toBeTruthy();
})


