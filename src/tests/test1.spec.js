const { expect } = require('@playwright/test');
const { test } = require('../fixture');

import { standartUser } from '../data/users';
import { sortAscending_A_Z, sortDescending_Z_A, sortAscending, sortDescending } from '../utils/sortItems';

const sortParameters = ['az', 'za', 'lohi', 'hilo'];

test.describe('Task 1 - Perform and verify sorting on the Inventory page', () => {

    test.beforeEach('Login as standart_user', async ({ loginPage, inventoryPage }) => {
        await loginPage.navigate();
        await loginPage.performLogin(standartUser.userName, standartUser.password);
        await expect(inventoryPage.headerTitle).toBeVisible();
    });

    test('Sort products by Titles ASC', async ({ inventoryPage }) => {

        // Click on the opion "A to Z" to sort products on UI
        await inventoryPage.selectSortingOption('az');

        // Get all products titles
        const allItemsTitle = await inventoryPage.getAllInventoryItemsTitle();

        // Call function to sort products by Titles in ASC
        const sortedByTitlesASC = sortAscending_A_Z(allItemsTitle);

        expect(allItemsTitle).toEqual(sortedByTitlesASC);
    }); 

    test('Sort products by Titles DESC', async ({ inventoryPage }) => {

        // Click on the opion "Z to A" to sort products on UI
        await inventoryPage.selectSortingOption('za');

        // Store all product titles
        const allItemsTitle = await inventoryPage.getAllInventoryItemsTitle();

        // Sort products by title DESC
        const sortedByTitlesDESC = sortDescending_Z_A(allItemsTitle);

        expect(allItemsTitle).toEqual(sortedByTitlesDESC);
    });

    test('Sort products by Prices ASC', async ({ inventoryPage }) => {

        // Click on the opion "low to high" to sort products on UI
        await inventoryPage.selectSortingOption('lohi');
        
        const AllItemsPrice = await inventoryPage.getAllInventoryItemsPrice();
        const sortedByPricesLowToHigh = sortAscending(AllItemsPrice);

        expect(AllItemsPrice).toEqual(sortedByPricesLowToHigh);
    });

    test('Sort products by Prices DESC', async ({ inventoryPage }) => {

        // Click on the opion "high to low" to sort products on UI
        await inventoryPage.selectSortingOption('hilo');

        const AllItemsPrice = await inventoryPage.getAllInventoryItemsPrice();
        const sortedByPricesHighToLow = sortDescending(AllItemsPrice);

        expect(AllItemsPrice).toEqual(sortedByPricesHighToLow);
    });
});
