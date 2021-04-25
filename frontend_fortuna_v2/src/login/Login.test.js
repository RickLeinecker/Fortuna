import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Login from './Login';
import LoginPopup from './LoginPopup';
import ResendEmailPopup from './ResendEmailPopup';
import ResetPassword from './ResetPassword';
import SignupPopup from './SignupPopup';

it('sign', () => {
  const { getByTestId } = render(<SignupPopup/>);
  const sign = getByTestId("signRoot");

  expect(sign).toBeTruthy()
})

it('reset', () => {
  const { getByTestId } = render(<ResetPassword/>);
  const reset = getByTestId("resetPw")

  expect(reset).toBeTruthy()
})

it('resend', () => {
  const { getByTestId } = render(<ResendEmailPopup/>);
  const resend = getByTestId("resendEmail");

  expect(resend).toBeTruthy()
})


it('checkLoginRender', () => {
  const { getByTestId } = render(<Login />);
  const leader = getByTestId("leaderboardTest");

  expect(leader).toBeTruthy();
  
})

it('loginright', () => {
  const { getByTestId } = render(<Login />);
  const loginright = getByTestId("loginright");

  expect(loginright).toBeTruthy();
  
})

it('info', () => {
  const { getByTestId } = render(<Login />);
  const info = getByTestId("fortunainfo");

  expect(info).toBeTruthy();
  
})

it('logPopRootDiv', () => {
  const { getByTestId } = render(<LoginPopup/>);

  const logpop = getByTestId("logpopup");
  const logBtn = getByTestId("logBtn");

  expect(logpop).toBeTruthy();
  expect(logBtn).toBeTruthy();

})