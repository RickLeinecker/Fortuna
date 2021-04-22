import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import TrainingArena from './TrainingArena';

import { BrowserRouter } from 'react-router-dom';

import setPreferredBattleType from './setPreferredBattleType'


it('help', () => {
  const { queryByTitle } = render(
    <BrowserRouter>
      <TrainingArena/>
    </BrowserRouter>
    );

  const help = queryByTitle("helpBtn");

  expect(help).toBeTruthy();

})

it('leftCol', () => {
  const { queryByTitle } = render(
    <BrowserRouter>
      <TrainingArena/>
    </BrowserRouter>
  );
  const left = queryByTitle("leftCol");

  expect(left).toBeTruthy();
})

it('midCol', () => {
  const { queryByTitle } = render(
    <BrowserRouter>
      <TrainingArena/>
    </BrowserRouter>
  );

  const mid = queryByTitle("midCol");

  expect(mid).toBeTruthy();
})

it('rightCol', () => {
  const { queryByTitle } = render(
    <BrowserRouter>
      <TrainingArena/>
    </BrowserRouter>
  );

  const right = queryByTitle("rightCol");

  expect(right).toBeTruthy();
})