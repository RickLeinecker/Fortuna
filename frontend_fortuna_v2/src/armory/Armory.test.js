import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Armory from './Armory';

it('armoryRoot', () => {
  const { queryByTitle } = render(
    <BrowserRouter>
      <Armory/>
    </BrowserRouter>
  );

  const root = queryByTitle("armoryRoot");

  expect(root).toBeTruthy();
});

it('armNav', () => {
  const { queryByTitle } = render(
    <BrowserRouter>
      <Armory/>
    </BrowserRouter>
  );

  const nav = queryByTitle("armNav");

  expect(nav).toBeTruthy();
});

it('armLeft', () => {
  const { queryByTitle } = render(
    <BrowserRouter>
      <Armory/>
    </BrowserRouter>
  );

  const left = queryByTitle("armLeft");

  expect(left).toBeTruthy();
});

it('armMid', () => {
  const { queryByTitle } = render(
    <BrowserRouter>
      <Armory/>
    </BrowserRouter>
  );

  const mid = queryByTitle("armMid");

  expect(mid).toBeTruthy();
});

it('armRight', () => {
  const { queryByTitle } = render(
    <BrowserRouter>
      <Armory/>
    </BrowserRouter>
  );

  const right = queryByTitle("armRight");

  expect(right).toBeTruthy();
});
