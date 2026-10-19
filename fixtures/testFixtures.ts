import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import loginData from '../test-data/loginData.json';

type TestFixtures = {
    authenticatedPage: Page;
};

export const test = base.extend<TestFixtures>({
    authenticatedPage: async ({ page }, use) => {

        await page.goto('/');

        const loginPage = new LoginPage(page);

        await loginPage.login(
            loginData.validLogin.username,
            loginData.validLogin.password
        );

        await use(page);
    },
});

export { expect } from '@playwright/test';