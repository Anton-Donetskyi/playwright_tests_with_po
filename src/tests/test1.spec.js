/**
 * [
  'Sauce Labs Backpack',
  'Sauce Labs Bike Light',
  'Sauce Labs Bolt T-Shirt',
  'Sauce Labs Fleece Jacket',
  'Sauce Labs Onesie',
  'Test.allTheThings() T-Shirt (Red)'
]
 */

/**
 * [
    "$29.99",
    "$9.99",
    "$15.99",
    "$49.99",
    "$7.99",
    "$15.99",
  ]
 */

const { expect } = require('@playwright/test');
const { test } = require('../fixture');

const credentials = { 
    userName: 'standard_user', 
    password: 'secret_sauce'
};

const sortParameters = ['az', 'za', 'lohi', 'hilo'];

// Function to sort in ascending order for numeric values
const sortAscending = (pricesArray) => {
    return pricesArray.map(price => parseFloat(price.slice(1))).sort((a, b) => a - b);
    //pricesArray.sort((a, b) => a - b);
};

// Function to sort in descending order for numeric values
const sortDescending = (pricesArray) => {
    return pricesArray.map(price => parseFloat(price.slice(1))).sort((a, b) => b - a);
};

// Function to sort in ascending order for string values
const sortAscending_A_Z = (array) => {
    return [...array].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
};

// Function to sort in descending order for string values
const sortDescending_Z_A = (array) => {
    return [...array].sort((a, b) => b.toLowerCase().localeCompare(a.toLowerCase()));
};


test.describe('Task 1 - Perform and verify sorting on the Inventory page', () => {

    test.beforeEach('Login as standart_user', async ({ page }) => {
        await page.goto('');
        await page.getByPlaceholder('Username').fill(credentials.userName);
        await page.getByPlaceholder('Password').fill(credentials.password);
        await page.locator('[data-test="login-button"]').click();
    });

    test('Sort products by Titles ASC', async ({ page }) => {

        // Get all products titles
        const allItemTitles = await page.locator('[data-test="inventory-item-name"]').allInnerTexts();

        // Call function to sort products by Titles in ASC
        const sortedByTitlesASC = sortAscending_A_Z(allItemTitles);

        // Click on the opion "A to Z" to sort products on UI
        await page.locator('[data-test="product-sort-container"]').selectOption('az');

        // Get all products titles after sorting on UI
        const actualSort = await page.locator('[data-test="inventory-item-name"]').allInnerTexts();

        expect(actualSort).toEqual(sortedByTitlesASC);
    }); 

    test('Sort products by Titles DESC', async ({ page }) => {

        // Store all product titles
        const allItemTitles = await page.locator('[data-test="inventory-item-name"]').allInnerTexts();

        const sortedByTitlesDESC = sortDescending_Z_A(allItemTitles);
        await page.locator('[data-test="product-sort-container"]').selectOption('za');

        const actualSort = await page.locator('[data-test="inventory-item-name"]').allInnerTexts();
        expect(actualSort).toEqual(sortedByTitlesDESC);

    });

    test('Sort products by Prices ASC', async ({ page }) => {

        const AllItemPrices = await page.locator('[data-test="inventory-item-price"]').allInnerTexts();

        const sortedByPricesLowToHigh = sortAscending(AllItemPrices);

        await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

        let actualSort = (await page
            .locator('[data-test="inventory-item-price"]')
            .allInnerTexts())
            .map(price => parseFloat(price.slice(1)));

        //actualSort.map(price => parseFloat(price.slice(1)));

        expect(actualSort).toEqual(sortedByPricesLowToHigh);

    });

    test('Sort products by Prices DESC', async ({ page }) => {

        const AllItemPrices = await page.locator('[data-test="inventory-item-price"]').allInnerTexts();

        const sortedByPricesHighToLow = sortDescending(AllItemPrices);

        await page.locator('[data-test="product-sort-container"]').selectOption('hilo');

        let actualSort = (await page
            .locator('[data-test="inventory-item-price"]')
            .allInnerTexts())
            .map(price => parseFloat(price.slice(1)));

        expect(actualSort).toEqual(sortedByPricesHighToLow);

    });
});
