import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Marketplace from './Marketplace';

import { BrowserRouter } from 'react-router-dom';


it('mainMarket', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Marketplace/>
    </BrowserRouter>
  );
  const part = getByTestId("rootMainMarket");

  expect(part).toBeTruthy();

})

it('mainMarket2', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Marketplace/>
    </BrowserRouter>
  );

  const container = getByTestId("marketContainer1");
  expect(container).toBeTruthy();
})

it('mainMarket2', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Marketplace/>
    </BrowserRouter>
  );

  const container = getByTestId("marketContainer2");
  expect(container).toBeTruthy();
})