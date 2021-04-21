import { render, fireEvent, queryByTitle } from '@testing-library/react';

import Login from './../Login';

it('checkLoginRender', () => {
  const { queryAllByTitle } = render(<Login />);
  const leader = queryByTitle("leaderboardTest");

  expect(leader).toBeTruthy();
  
})