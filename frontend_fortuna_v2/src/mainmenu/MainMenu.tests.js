import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import MainMenu from './MainMenu';

import { BrowserRouter } from 'react-router-dom';

it('mainMenuRoot', () => {
  const { queryByTitle } = render(
    <BrowserRouter>
      <MainMenu/>
    </BrowserRouter>
  );

  const root = queryByTitle("mainMenuRoot");
  expect(root).toBeTruthy();
});

it('mainMenuHelp', () => {
  const { queryByTitle } = render(
    <BrowserRouter>
      <MainMenu/>
    </BrowserRouter>
  );

  const help = queryByTitle("helpBtn");
  expect(help).toBeTruthy();
})

it('battleRecord', () => {
  const { queryByTitle } = render(
    <BrowserRouter>
      <MainMenu/>
    </BrowserRouter>
  );

  const battle = queryByTitle("mainBattle");
  expect(battle).toBeTruthy();
})

it('mainMid', () => {
  const { queryByTitle } = render(
    <BrowserRouter>
      <MainMenu/>
    </BrowserRouter>
  );

  const mid = queryByTitle("mainMenuMid");
  expect(mid).toBeTruthy();
})

it('mainMenuTank', () => {
  const { queryByTitle } = render(
    <BrowserRouter>
      <MainMenu/>
    </BrowserRouter>
  );

  const tank = queryByTitle("tankDisplay");
  expect(tank).toBeTruthy();
})


