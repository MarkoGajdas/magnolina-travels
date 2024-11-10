import { test } from '@playwright/test';
import { URLS_TOURS } from '../constants/urls';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { HutToHutPage } from '../pages/Tours/Active/ActiveTours/HutToHutPage';
import { ToursActivePage } from '../pages/Tours/Active/ToursActivePage';
import { BookYourTourPage } from '../pages/BookYourTour/BookYourTourPage';
import { MealPage } from '../pages/BookYourTour/MealPage';
import { PersonalDetailsPage } from '../pages/BookYourTour/PersonalDetails';
import { ReviewPage } from '../pages/BookYourTour/ReviewPage';
import { USER_DETAILS } from '../constants/personalDetails';
import { DropdownOptions } from '../enums/dropdown.enum';
import { FILE_TYPES } from '../constants/fileTypes';


test.describe('Should login and verify navigation elements. ', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let toursActivePage: ToursActivePage;
  let huteToHutePage: HutToHutPage;
  let bookYourTourPagePage: BookYourTourPage;
  let mealPage: MealPage;
  let personalDetails: PersonalDetailsPage;
  let reviewPage: ReviewPage;

  // Precondition: Initialize pages and log in before each test
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    toursActivePage = new ToursActivePage(page);
    huteToHutePage = new HutToHutPage(page)
    bookYourTourPagePage = new BookYourTourPage(page)
    mealPage = new MealPage(page)
    personalDetails = new PersonalDetailsPage(page);
    reviewPage = new ReviewPage(page);

    
    await loginPage.gotoLoginPage();
    await loginPage.loginAndVerify('admin');
  });

  test('Should verify that toure is booked successfully', async ({ }) => {
    await homePage.clickOnTours();
    await homePage.clickOnTourDropdownItem(DropdownOptions.Active);

    await toursActivePage.verifyToursActivePage();
    await toursActivePage.clickViewTourByHref(URLS_TOURS.TOUR_HUT_TO_HUT.PARTIAL_URL);

    await huteToHutePage.verifyHutToHutPage();
    await huteToHutePage.clickOnBookTour();

    await bookYourTourPagePage.setNumberOfAdults(5);
    await bookYourTourPagePage.setNumberOfYouth(1);
    await bookYourTourPagePage.checkUpgrade1Checkbox();
    await bookYourTourPagePage.checkUpgrade2Checkbox();
    await bookYourTourPagePage.checkUpgrade3Checkbox();
    await bookYourTourPagePage.selectYesOption();
    await bookYourTourPagePage.clickNextStepButton();

    await mealPage.clickMealRadioButton(1);
    await mealPage.setAdditionalMealNotes('Notes');
    await mealPage.clickNextStepButton();

    await personalDetails.setTitleField(USER_DETAILS.USER_MARKO.FIRST_NAME);
    await personalDetails.setFirstNameField(USER_DETAILS.USER_MARKO.FIRST_NAME);
    await personalDetails.setLastNameField(USER_DETAILS.USER_MARKO.FIRST_NAME);
    await personalDetails.setEmailField(USER_DETAILS.USER_MARKO.EMAIL);
    await personalDetails.setPhoneField(USER_DETAILS.USER_MARKO.PHONE);
    await personalDetails.setCityField(USER_DETAILS.USER_MARKO.CITY);
    await personalDetails.setPostalCodeField(USER_DETAILS.USER_MARKO.POSTAL);
    await personalDetails.setCountryField(USER_DETAILS.USER_MARKO.COUNTRY);
    await personalDetails.setProvinceField(USER_DETAILS.USER_MARKO.PROVINCE);
    await personalDetails.clickNextStepButton();

    await reviewPage.uploadFile(FILE_TYPES.TXT);
    await reviewPage.clickConfirmButton();
    await reviewPage.verifyNoErrorMessage();

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

