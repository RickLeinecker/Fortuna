import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import TrainingArena from './TrainingArena';


it('help', () => {
  const { queryByTitle } = render(<TrainingArena/>);
  const help = queryByTitle("helpBtn");

  expect(help).toBeTruthy();

})

it('leftCol', () => {
  const { queryByTitle } = render(<TrainingArena/>);
  const left = queryByTitle("leftCol");

  expect(left).toBeTruthy();
})

it('midCol', () => {
  const { queryByTitle } = render(<TrainingArena/>);
  const mid = queryByTitle("midCol");

  expect(mid).toBeTruthy();
})

it('rightCol', () => {
  const { queryByTitle } = render(<TrainingArena/>);
  const right = queryByTitle("rightCol");

  expect(right).toBeTruthy();
})