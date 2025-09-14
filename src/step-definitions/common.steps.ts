import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';

Given('I am on the Amazon homepage', async () => {
    await browser.url('https://www.amazon.com/');
});

When('I search for {string}', async (product: string) => {
    const searchBox = await $('#twotabsearchtextbox');
    await searchBox.setValue(product);
    const searchButton = await $('input[type="submit"]');
    await searchButton.click();
});

When('I add the first product to my cart from the search results', async () => {
    const firstProductAddToCartButton = await $('(//button[contains(@aria-label, "Add to Cart")])[1]');
    await firstProductAddToCartButton.click();
});

When('I try to add the first product to my cart from the search results', async () => {
    const firstProductAddToCartButton = await $('(//button[contains(@aria-label, "Add to Cart")])[1]');
    if (await firstProductAddToCartButton.isDisplayed()) {
        await firstProductAddToCartButton.click();
    }
});

When('I add the first three products to my cart from the search results', async () => {
    for (let i = 1; i <= 3; i++) {
        const productAddToCartButton = await $(`(//button[contains(@aria-label, "Add to Cart")])[${i}]`);
        await productAddToCartButton.click();
    }
});

Then('the cart should reflect the added item', async () => {
    const cartCount = await $('.nav-cart-count');
    await expect(cartCount).toHaveTextContaining('1');
});

Then('the cart should reflect three added items', async () => {
    const cartCount = await $('.nav-cart-count');
    await expect(cartCount).toHaveTextContaining('3');
});

Then('I should see {string} message', async (message: string) => {
    const alertMessage = await $('div.alert');
    await expect(alertMessage).toHaveTextContaining(message);
});