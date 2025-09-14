import { Given, When, Then } from '@wdio/cucumber-framework';

Given('the user is logged into their account', async () => {
  await browser.url('/login');
  await $('#username').setValue('user@example.com');
  await $('#password').setValue('password');
  await $('button=Login').click();
});

Given('the user has navigated to the order details page', async () => {
  await browser.url('/order-details');
});

Given('the order was delivered within the last 30 days and payment was completed', async () => {
  await expect($('#order-status')).toHaveTextContaining('Delivered');
  await expect($('#payment-status')).toHaveTextContaining('Completed');
});

Given('the order was delivered more than 30 days ago or payment was not completed', async () => {
  await expect($('#order-status')).toHaveTextContaining('Delivered Over 30 Days Ago');
});

When('the user selects a refund reason from the predefined list', async () => {
  await $('#refund-reason').selectByVisibleText('Damaged item');
});

When('the user submits the refund request', async () => {
  await $('button=Submit Refund Request').click();
});

When('the user attempts to select a refund reason', async () => {
  await expect($('#refund-reason')).not.toBeDisplayed();
});

When('the user attempts to submit a refund request without selecting a reason', async () => {
  await $('button=Submit Refund Request').click();
});

Then('the order status should be updated to "Refund Requested"', async () => {
  await expect($('#order-status')).toHaveTextContaining('Refund Requested');
});

Then('a confirmation email should be sent to the customer', async () => {
  await expect(browser).toHaveReceivedEmailContaining('Refund Requested');
});

Then('an analytics event for "Refund Request Initiated" should be triggered', async () => {
  await expect(browser).toHaveTriggeredAnalyticsEvent('Refund Request Initiated');
});

Then('the refund option should not be visible', async () => {
  await expect($('#refund-section')).not.toBeDisplayed();
});

Then('no refund request should be submitted', async () => {
  await expect($('#submit-status')).toHaveTextContaining('Not Submitted');
});

Then('the submission should be prevented', async () => {
  await expect($('#submit-status')).toHaveTextContaining('Prevented');
});

Then('an error message "Please select a refund reason" should be displayed', async () => {
  await expect($('#error-message')).toHaveText('Please select a refund reason');
});