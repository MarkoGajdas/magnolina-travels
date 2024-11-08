import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homePage';
import { AboutPage } from '../pages/AboutPage';
import { StoriesPage } from '../pages/StoriesPage';
import { ContactPage } from '../pages/ContacntPage';
import { MembersPage } from '../pages/MembersPage';
import { ToursActivePage } from '../pages/Tours/Active/ToursActivePage';
import { URLS_TOURS } from '../constants/urls';
import { HutToHutPage } from '../pages/Tours/Active/ActiveTours/HutToHutPage';


test.describe('Login and verify navigation elements. ', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let aboutPage: AboutPage;
  let storiesPage: StoriesPage;
  let contactPage: ContactPage;
  let membersPage: MembersPage;
  let toursActivePage: ToursActivePage;
  let huteToHutePage: HutToHutPage;

  // Precondition: Initialize pages and log in before each test
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    aboutPage = new AboutPage(page);
    storiesPage = new StoriesPage(page);
    contactPage = new ContactPage(page);
    membersPage = new MembersPage(page);
    toursActivePage = new ToursActivePage(page);
    huteToHutePage = new HutToHutPage(page)

    await loginPage.goto();
    await loginPage.loginAndVerify('admin');
  });

  test('Should verify that Destination subpages are loaded successfully', async ({ page }) => {
    await homePage.clickOnToursDropdown();
    await homePage.clickOnTourDropdownItem('ACTIVE');
  });

  test('Should verify that Tou', async ({ page }) => {
    await toursActivePage.verifyToursActivePage();
    await toursActivePage.clickViewTourByHref(URLS_TOURS.TOUR_HUT_TO_HUT.PARTIAL_URL);
  });

  test('Should verify that Tou', async ({ page }) => {
    await huteToHutePage.verifyProperties('Start city','Zurich, Switzerland');
    await huteToHutePage.verifyProperties('Duration','7 Days');
    await huteToHutePage.verifyProperties('Tour operator','Magnolia Travels');
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

