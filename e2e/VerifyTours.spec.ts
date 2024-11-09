import { test } from '@playwright/test';
import { URLS_TOURS } from '../constants/urls';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { HutToHutPage } from '../pages/Tours/Active/ActiveTours/HutToHutPage';
import { ToursActivePage } from '../pages/Tours/Active/ToursActivePage';


test.describe('Login and verify tours.', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let toursActivePage: ToursActivePage;
  let huteToHutePage: HutToHutPage;

  // Precondition: Initialize pages and log in before each test
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    toursActivePage = new ToursActivePage(page);
    huteToHutePage = new HutToHutPage(page)

    await loginPage.gotoLoginPage();
    await loginPage.loginAndVerify('admin');
  });

  test('Should verify that Destination subpages are loaded successfully', async ({ page }) => {
    await homePage.clickOnTours();
    await homePage.clickOnTourDropdownItem('ACTIVE');
    await toursActivePage.verifyToursActivePage();
    await toursActivePage.clickViewTourByHref(URLS_TOURS.TOUR_HUT_TO_HUT.PARTIAL_URL);
    await huteToHutePage.verifyProperties('Start city', 'Zurich, Switzerland');
    await huteToHutePage.verifyProperties('Duration', '7 days');
    await huteToHutePage.verifyProperties('Tour operator', 'Magnolia Travels');
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

