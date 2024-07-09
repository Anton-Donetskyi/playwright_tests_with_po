const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    get headerTitle() { return this.page.locator('.title'); }

    get inventoryItems() { return this.page.locator('.inventory_item'); }

    get addItemToCartBtns() { return this.page.locator('[id^="add-to-cart"]'); }

    get itemsSortingOptions() { return this.page.locator('[data-test="product-sort-container"]'); }

    async selectSortingOption(value) {
        await this.itemsSortingOptions.selectOption(value);
    }

    async getAllInventoryItemsTitle() { 
        return this.page.locator('[data-test="inventory-item-name"]').allInnerTexts();
    }

    async getAllInventoryItemsPrice() {
        const pricesWithCurrency = await this.page.locator('[data-test="inventory-item-price"]').allInnerTexts();
        return pricesWithCurrency.map(price => parseFloat(price.slice(1)));
    }

    async addItemToCartById(id) {
        await this.addItemToCartBtns.nth(id).click();
    }
}
