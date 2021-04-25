import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Login from './Login';
import LoginPopup from './LoginPopup';
import ResendEmailPopup from './ResendEmailPopup';
import ResetPassword from './ResetPassword';
import SignupPopup from './SignupPopup';

it('sign', () => {
  const { queryByTitle } = render(<SignupPopup/>);
  const sign = queryByTitle("signRoot");

  expect(sign).toBeTruthy()
})

it('reset', () => {
  const { queryByTitle } = render(<ResetPassword/>);
  const reset = queryByTitle("resetPw")

  expect(reset).toBeTruthy()
})

it('resend', () => {
  const { queryByTitle } = render(<ResendEmailPopup/>);
  const resend = queryByTitle("resendEmail");

  expect(resend).toBeTruthy()
})


it('checkLoginRender', () => {
  const { queryByTitle } = render(<Login />);
  const leader = queryByTitle("leaderboardTest");

  expect(leader).toBeTruthy();
  
})

it('loginright', () => {
  const { queryByTitle } = render(<Login />);
  const loginright = queryByTitle("loginright");

  expect(loginright).toBeTruthy();
  
})

it('info', () => {
  const { queryByTitle } = render(<Login />);
  const info = queryByTitle("fortunainfo");

  expect(info).toBeTruthy();
  
})

it('logPopRootDiv', () => {
  const { queryByTitle } = render(<LoginPopup/>);

  const logpop = queryByTitle("logpopup");
  const logBtn = queryByTitle("logBtn");

  expect(logpop).toBeTruthy();
  expect(logBtn).toBeTruthy();

})