// loginTest.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { AboutPage } from '../pages/AboutPage';
import { StoriesPage } from '../pages/StoriesPage';
import { ContactPage } from '../pages/ContacntPage';
import { MembersPage } from '../pages/MembersPage';


test.describe('Login and verify navigation elements. ', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let aboutPage: AboutPage;
  let storiesPage: StoriesPage;
  let contactPage: ContactPage;
  let membersPage: MembersPage;

  // Precondition: Initialize pages and log in before each test
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    aboutPage = new AboutPage(page);
    storiesPage = new StoriesPage(page);
    contactPage = new ContactPage(page);
    membersPage = new MembersPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.loginAndVerify('admin');
  });

  test('Should verify that Stories page loaded successfully', async ({ page }) => {
    await homePage.clickOnStories();
    await storiesPage.verifyStoriesPage();
  });

  test('Should verify that About page loaded successfully', async ({ page }) => {
    await homePage.clickOnAbout();
    await aboutPage.verifyAboutPage();
  });

  test('Should verify that Contact page loaded successfully', async ({ page }) => {
    await homePage.clickOnContact();
    await contactPage.verifyContactPage();
  });

  test('Should verify that Members page loaded successfully', async ({ page }) => {
    await homePage.clickOnMembers();
    await membersPage.verifyMembersPage();
  });

  test('Should verify that Tours subpages are loaded successfully', async ({ page }) => {
    await homePage.navigateToToursSubpages();
    await homePage.verfyEachTourSubpage();
  });

  test('Should verify that Destination subpages are loaded successfully', async ({ page }) => {
    await homePage.clickOnTours();
    await homePage.verifyDestinationsSubpages();
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

