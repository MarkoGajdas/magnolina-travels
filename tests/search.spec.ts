// loginTest.spec.ts
import { test } from '@playwright/test';
import { ContactPage } from '../pages/ContacntPage';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';


test.describe('Login and search ', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let contactPage: ContactPage;

  // Precondition: Initialize pages and log in before each test
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    contactPage = new ContactPage(page);


    await loginPage.goto();
    await loginPage.loginAndVerify('admin');
  });

  test('Should search for Europe, click on some results and verify if you are on correct page at the end.', async ({ page }) => {
    await homePage.navigateToHome();
    await homePage.verifyAndClickSearchResult('Europe', 5 , 1);
    await contactPage.verifyContactPage();
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

