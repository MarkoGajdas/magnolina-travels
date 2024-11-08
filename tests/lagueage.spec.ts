// loginTest.spec.ts
import { test } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { LoginPage } from '../pages/loginPage';


test.describe('Login and verify navigation elements. ', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;

  // Precondition: Initialize pages and log in before each test
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    

    await loginPage.goto();
    await loginPage.loginAndVerify('admin');
  });

  test('Should verify that Stories page loaded successfully', async ({ page }) => {
    await homePage.navigateToHome();
    await homePage.cllickOnLanguageGer();
    await homePage.verifyHomePageGer();
    await homePage.cllickOnLanguageEng();
    await homePage.verifyHomePage();
  });

  // Postcondition: Close the page after each test
  test.afterEach(async ({ page }) => {
    await page.close();
  });

  // Postcondition: Close the browser after the test suite
  test.afterAll(async ({ browser }) => {
    await browser.close();
  });
});

