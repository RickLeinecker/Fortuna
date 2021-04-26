import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Armory from './Armory';

it('armoryRoot', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Armory/>
    </BrowserRouter>
  );

  const root = getByTestId("armoryRoot");

  expect(root).toBeTruthy();
});

it('armNav', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Armory/>
    </BrowserRouter>
  );

  const nav = getByTestId("armNav");

  expect(nav).toBeTruthy();
});

it('armLeft', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Armory/>
    </BrowserRouter>
  );

  const left = getByTestId("armLeft");

  expect(left).toBeTruthy();
});

it('armMid', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Armory/>
    </BrowserRouter>
  );

  const mid = getByTestId("armMid");

  expect(mid).toBeTruthy();
});

it('armRight', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Armory/>
    </BrowserRouter>
  );

  const right = getByTestId("armRight");

  expect(right).toBeTruthy();
});
