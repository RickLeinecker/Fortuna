import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Battlearena from './BattleArena';
import Replays from './Replays';
import Replay from '../globalComponents/typesAndClasses/Replay';
import SearchPlayers from './SearchPlayers';
import { BrowserRouter } from 'react-router-dom';

it('arenaRoot', () => {
  const { queryByTitle } = render(
    <BrowserRouter>
      <Battlearena/>
    </BrowserRouter>
  );

  const root = queryByTitle("arenaRoot");

  expect(root).toBeTruthy();
});

it('arenaleft', () => {
  const { queryByTitle } = render(
    <BrowserRouter>
      <Battlearena/>
    </BrowserRouter>
  );

  const left = queryByTitle("arenaleft");

  expect(left).toBeTruthy();
});

it('arenaMid', () => {
  const { queryByTitle } = render(
    <BrowserRouter>
      <Battlearena/>
    </BrowserRouter>
  );

  const mid = queryByTitle("arenaMid");

  expect(mid).toBeTruthy();
});

it('arenaRight', () => {
  const { queryByTitle } = render(
    <BrowserRouter>
      <Battlearena/>
    </BrowserRouter>
  );

  const right = queryByTitle("arenaRight");

  expect(right).toBeTruthy();
});

it('replayRoot', () => {
  const { queryByTitle } = render(<Replays/>);

  const replay = queryByTitle("replayRoot");

  expect(replay).toBeTruthy();
});

it('searchRoot', () => {
  const { queryByTitle } = render(<SearchPlayers/>);

  const replay = queryByTitle("searchRoot");

  expect(replay).toBeTruthy();
});