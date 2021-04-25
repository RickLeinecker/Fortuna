import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import TrainingArena from './TrainingArena';

import { BrowserRouter } from 'react-router-dom';

it('help', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <TrainingArena/>
    </BrowserRouter>
    );

  const help = getByTestId("helpBtn");

  expect(help).toBeTruthy();

})

it('leftCol', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <TrainingArena/>
    </BrowserRouter>
  );
  const left = getByTestId("leftCol");

  expect(left).toBeTruthy();
})

it('midCol', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <TrainingArena/>
    </BrowserRouter>
  );

  const mid = getByTestId("midCol");

  expect(mid).toBeTruthy();
})

it('rightCol', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <TrainingArena/>
    </BrowserRouter>
  );

  const right = getByTestId("rightCol");

  expect(right).toBeTruthy();
})