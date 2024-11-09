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
    await homePage.clickOnTourDropdownItem('ACTIVE');

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
    await mealPage.setAdditionalMealNotes('Marko');
    await mealPage.clickNextStepButton();

    await personalDetails.setTitleField('Test');
    await personalDetails.setFirstNameField('Marko');
    await personalDetails.setLastNameField('Gajdas');
    await personalDetails.setEmailField('markogajdas60@gmail.com');
    await personalDetails.setPhoneField('0601332229');
    await personalDetails.setCityField('Beograd');
    await personalDetails.setPostalCodeField('11000');
    await personalDetails.setCountryField('Srbija');
    await personalDetails.setProvinceField('None');
    await personalDetails.clickNextStepButton();

    await reviewPage.uploadFile('/Users/Marko/QnitAssignment/files/testFile.text');
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

