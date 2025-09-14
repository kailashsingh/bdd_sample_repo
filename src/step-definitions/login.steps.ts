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

Then('I should be redirected to the dashboard', async () => {
  await expect(browser).toHaveUrlContaining('/dashboard');
});

Then('I should see {string} message', async (message) => {
  await expect($('body')).toHaveTextContaining(message);
});

Then('a session token should be stored in cookies', async () => {
  const cookies = await browser.getCookies(['session_token']);
  expect(cookies).not.toBeNull();
});

Given('I have entered incorrect credentials {int} times', async (times) => {
  for (let i = 0; i < times; i++) {
    await $('#email').setValue('user@example.com');
    await $('#password').setValue('wrongpass');
    await $('button=Login').click();
    await browser.refresh();
  }
});

When('I try to log in again with {string} and {string}', async (email, password) => {
  await $('#email').setValue(email);
  await $('#password').setValue(password);
  await $('button=Login').click();
});