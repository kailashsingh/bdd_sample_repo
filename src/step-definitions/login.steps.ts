import { Given, When, Then } from '@wdio/cucumber-framework';

Given('I am on the login page', async () => {
  await browser.url('/login');
});

When('I enter {string} in the email field', async (email) => {
  await $('#email').setValue(email);
});

When('I enter {string} in the password field', async (password) => {
  await $('#password').setValue(password);
});

When('I click the login button', async () => {
  await $('button=Login').click();
});

When('I enter the 2FA code received on my phone', async () => {
  const code = await browser.receiveSmsCode(); // Assuming functionality to receive SMS
  await $('#2fa-code').setValue(code);
});

When('I enter an incorrect 2FA code', async () => {
  await $('#2fa-code').setValue('wrong123');
});

When('I click on "Resend Code" button', async () => {
  await $('button=Resend Code').click();
});

Then('I should be redirected to the dashboard', async () => {
  await expect(browser).toHaveUrlContaining('/dashboard');
});

Then('I should see {string} message', async (message) => {
  await expect($('body')).toHaveTextContaining(message);
});

Then('I should receive a new 2FA code', async () => {
  await expect(browser).toHaveReceivedSms(); // Assuming functionality to check SMS reception
});

Then('I should be able to enter the new 2FA code', async () => {
  const code = await browser.receiveSmsCode(); // Assuming functionality to receive SMS
  await $('#2fa-code').setValue(code);
  await expect($('#2fa-code')).toHaveValue(code);
});