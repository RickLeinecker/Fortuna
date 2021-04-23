import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Marketplace from './Marketplace';

import { BrowserRouter } from 'react-router-dom';


it('mainMarket', () => {
  const { queryByTitle } = render(
    <BrowserRouter>
      <Marketplace/>
    </BrowserRouter>
  );
  const part = queryByTitle("rootMainMarket");

  expect(part).toBeTruthy();

})

it('mainMarket2', () => {
  const { queryByTitle } = render(
    <BrowserRouter>
      <Marketplace/>
    </BrowserRouter>
  );

  const container = queryByTitle("marketContainer1");
  expect(container).toBeTruthy();
})

it('mainMarket2', () => {
  const { queryByTitle } = render(
    <BrowserRouter>
      <Marketplace/>
    </BrowserRouter>
  );

  const container = queryByTitle("marketContainer2");
  expect(container).toBeTruthy();
})