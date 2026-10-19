import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import loginData from '../test-data/loginData.json';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('Verify login succeeds with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
        loginData.validLogin.username,
        loginData.validLogin.password
    );

    await expect(
        page.getByText(loginData.validLogin.expectedText)
    ).toBeVisible();
});

test('Verify login fails with valid username and invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
        loginData.invalidPassword.username,
        loginData.invalidPassword.password
    );

    await expect(
        page.getByText(loginData.invalidPassword.expectedText)
    ).toBeVisible();
});

test('Verify login fails with invalid username and valid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
        loginData.invalidUsername.username,
        loginData.invalidUsername.password
    );

    await expect(
        page.getByText(loginData.invalidUsername.expectedText)
    ).toBeVisible();
});

test('Verify login fails with invalid username and invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
        loginData.invalidCredentials.username,
        loginData.invalidCredentials.password
    );

    await expect(
        page.getByText(loginData.invalidCredentials.expectedText)
    ).toBeVisible();
});

test('Verify login fails when username is empty', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
        loginData.emptyUsername.username,
        loginData.emptyUsername.password
    );

    await expect(
        page.getByText(loginData.emptyUsername.expectedText)
    ).toBeVisible();
});

test('Verify login fails when password is empty', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
        loginData.emptyPassword.username,
        loginData.emptyPassword.password
    );

    await expect(
        page.getByText(loginData.emptyPassword.expectedText)
    ).toBeVisible();
});

test('Verify login fails when username and password are empty', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
        loginData.emptyCredentials.username,
        loginData.emptyCredentials.password
    );

    await expect(
        page.getByText(loginData.emptyCredentials.expectedText)
    ).toBeVisible();
});