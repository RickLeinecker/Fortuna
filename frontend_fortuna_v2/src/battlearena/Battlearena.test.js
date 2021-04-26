import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Battlearena from './BattleArena';
import Replays from './Replays';
import Replay from '../globalComponents/typesAndClasses/Replay';
import SearchPlayers from './SearchPlayers';
import { BrowserRouter } from 'react-router-dom';

it('arenaRoot', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Battlearena/>
    </BrowserRouter>
  );

  const root = getByTestId("arenaRoot");

  expect(root).toBeTruthy();
});

it('arenaleft', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Battlearena/>
    </BrowserRouter>
  );

  const left = getByTestId("arenaleft");

  expect(left).toBeTruthy();
});

it('arenaMid', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Battlearena/>
    </BrowserRouter>
  );

  const mid = getByTestId("arenaMid");

  expect(mid).toBeTruthy();
});

it('arenaRight', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Battlearena/>
    </BrowserRouter>
  );

  const right = getByTestId("arenaRight");

  expect(right).toBeTruthy();
});

it('replayRoot', () => {
  const { getByTestId } = render(<Replays/>);

  const replay = getByTestId("replayRoot");

  expect(replay).toBeTruthy();
});

it('searchRoot', () => {
  const { getByTestId } = render(<SearchPlayers/>);

  const replay = getByTestId("searchRoot");

  expect(replay).toBeTruthy();
});