import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {

    private page: Page;

    private productsHeading: Locator;
    private sortDropdown: Locator;
    private backToProductsButton: Locator;
    private detailsAddToCartButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.productsHeading = this.page.getByText('Products');

        this.sortDropdown = this.page.getByRole(
            'combobox',
            { name: 'Sort products' }
        );

        this.backToProductsButton = this.page.getByRole(
            'button',
            { name: 'Back to products' }
        );

        this.detailsAddToCartButton = this.page.getByRole(
            'button',
            { name: 'Add to cart' }
        );
    }

    async verifyProductsPageIsDisplayed() {
        await expect(this.productsHeading).toBeVisible();
    }

    async sortProducts(option: string) {
        await this.sortDropdown.selectOption(option);
    }

    async getProductNames() {
        return await this.page
            .locator('.inventory_item_name')
            .allTextContents();
    }

    async getProductPrices() {
        const prices = await this.page
            .locator('.inventory_item_price')
            .allTextContents();

        return prices.map(price => Number(price.replace('$', '')));
    }

    async openProduct(productName: string) {
        await this.page
            .getByText(productName, { exact: true })
            .click();
    }

    async verifyProductDetails(
        productName: string,
        description: string,
        price: string
    ) {
        await expect(this.backToProductsButton).toBeVisible();
        await expect(
            this.page.getByText(productName, { exact: true })
        ).toBeVisible();
        await expect(
            this.page.getByText(description, { exact: true })
        ).toBeVisible();
        await expect(
            this.page.getByText(price, { exact: true })
        ).toBeVisible();
        await expect(this.detailsAddToCartButton).toBeVisible();
    }
}