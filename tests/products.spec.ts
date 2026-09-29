import { test, expect } from '../fixtures/testFixtures';
import { ProductsPage } from '../pages/ProductsPage';
import productData from '../test-data/productData.json';

test('Verify Products page is displayed after successful login', async ({ authenticatedPage }) => {

    const productsPage = new ProductsPage(authenticatedPage);

    await productsPage.verifyProductsPageIsDisplayed();
});

test('Verify products are sorted alphabetically from A to Z', async ({ authenticatedPage }) => {

    const productsPage = new ProductsPage(authenticatedPage);

    await productsPage.sortProducts('az');

    const productNames = await productsPage.getProductNames();
    const sortedNames = [...productNames].sort((a, b) => a.localeCompare(b));

    expect(productNames).toEqual(sortedNames);
});

test('Verify products are sorted alphabetically from Z to A', async ({ authenticatedPage }) => {

    const productsPage = new ProductsPage(authenticatedPage);

    await productsPage.sortProducts('za');

    const productNames = await productsPage.getProductNames();
    const sortedNames = [...productNames].sort((a, b) => b.localeCompare(a));

    expect(productNames).toEqual(sortedNames);
});

test('Verify products are sorted by price from low to high', async ({ authenticatedPage }) => {

    const productsPage = new ProductsPage(authenticatedPage);

    await productsPage.sortProducts('lohi');

    const productPrices = await productsPage.getProductPrices();
    const sortedPrices = [...productPrices].sort((a, b) => a - b);

    expect(productPrices).toEqual(sortedPrices);
});

test('Verify products are sorted by price from high to low', async ({ authenticatedPage }) => {

    const productsPage = new ProductsPage(authenticatedPage);

    await productsPage.sortProducts('hilo');

    const productPrices = await productsPage.getProductPrices();
    const sortedPrices = [...productPrices].sort((a, b) => b - a);

    expect(productPrices).toEqual(sortedPrices);
});

test('Verify product details page after clicking product title', async ({ authenticatedPage }) => {

    const productsPage = new ProductsPage(authenticatedPage);

    await productsPage.openProduct(productData.bikeLight.name);

    await productsPage.verifyProductDetails(
        productData.bikeLight.name,
        productData.bikeLight.description,
        productData.bikeLight.price
    );
});