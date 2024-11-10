import * as fs from 'fs';
import * as path from 'path';
import { Page, expect } from '@playwright/test';
import { URLS_BASE_PAGES, URLS_SUBPAGES } from '../constants/urls';
import { DROPDOWN_LOCATORS } from '../constants/dropdowns';
import { DropdownOptions } from '../enums/dropdown.enum';


export class PageBase {

  constructor(page: Page) {
    this.page = page;
  }

  readonly page: Page;
  readonly usersPath = path.resolve(__dirname, '../config/users.json');
  readonly users = JSON.parse(fs.readFileSync(this.usersPath, 'utf-8'));

  readonly navTours = '.nav.navbar-nav >> text=Tours';
  readonly navDestinations = '.nav.navbar-nav >> text=Destinations';
  readonly navStories = '.nav.navbar-nav >> text=Stories';
  readonly navAbout = '.nav.navbar-nav >> text=About';
  readonly navContact = '.nav.navbar-nav >> text=Contact';
  readonly navMembers = '.nav.navbar-nav >> text=Members';

  readonly languageEng = '#language-link ul li a[title="English"]';
  readonly languageGer = '#language-link ul li a[title="German"]';

  readonly searchResultsListLocator  = '.list-group-item';
  readonly searchResultTextFragmentLocator  = 'span.excerpt-fragment';
  readonly searchField = '#nav-search';
  

  async navigateToHome() {
    await this.page.goto(URLS_BASE_PAGES.HOME_PAGE.URL);
  }

  async clickOnTours() {
    await this.page.click(this.navTours);
  }

  async clickOnStories() {
    await this.page.click(this.navStories);
  }

  async clickOnAbout() {
    await this.page.click(this.navAbout);
  }

  async clickOnContact() {
    await this.page.click(this.navContact);
  }

  async clickOnMembers() {
    await this.page.click(this.navMembers);
  }

  async cllickOnLanguageGer() {
    await this.page.click(this.languageGer);
  }

  async cllickOnLanguageEng() {
    await this.page.click(this.languageEng);
  }

  async clickToToursSubpages() {
    await this.page.click(this.navTours);
  }

  async verifyToursDropDown() {
    await this.verifyDropDownPages(DROPDOWN_LOCATORS.DROPDOWN_LOCATOR_TOURS, URLS_SUBPAGES.NAV_TOURS_URLS);
  }

  async verifyDestinationsDropDown() {
    await this.verifyDropDownPages(DROPDOWN_LOCATORS.DROPDOWN_LOCATOR_DESTINATIONS, URLS_SUBPAGES.NAV_DESTINATIONS_URLS);
  }


  async verifyPageLoad(expectedTitle: string, expectedUrl) {
    await this.page.waitForLoadState('load', { timeout: 15000 });
    await expect(this.page).toHaveTitle(expectedTitle);
    await expect(this.page).toHaveURL(expectedUrl);
  }

  async verifyDropDownPages(
    dropDownItemsLocators: { dropDownName: string; dropDownSubItems: string; }[],
    dropDownItemsUrls: { url: string; title: string }[],
  ) {
    for (let i = 0; i < dropDownItemsLocators.length; i++) {
      const dropDownName = dropDownItemsLocators[i];
      const urlInfo = dropDownItemsUrls[i];

      await this.page.click(dropDownName.dropDownName);
      await this.page.click(dropDownName.dropDownSubItems);

      await expect(this.page).toHaveURL(urlInfo.url);
      await expect(this.page).toHaveTitle(urlInfo.title);

      await this.page.waitForTimeout(2000);
    }
  }

  async verifyAndClickSearchResult(searchFor: string, minExpectedResults: number, clickElementIndex: number) {

    if (await minExpectedResults < 0 || clickElementIndex < 0) {
      throw new Error(`Number of expected results/ or index of item can't be less then 0.`);
    }

    await this.searchFor(searchFor);
    const results = await this.page.locator(this.searchResultsListLocator );

    const resultCount = await results.count();
    if (resultCount < minExpectedResults) {
      throw new Error(`Less than ${minExpectedResults} search results found`);
    }

    const targetResults = await this.page.locator(this.searchResultsListLocator )
      .locator(this.searchResultTextFragmentLocator)
      .filter({ hasText: searchFor });

    if (clickElementIndex >= resultCount) {
      throw new Error(`Invalid elementIndex ${clickElementIndex}, should be between 0 and ${resultCount - 1}`);
    }

    const targetResult = targetResults.nth(clickElementIndex);

    if (await targetResult.isVisible()) {
      await targetResult.click();
    } else {
      throw new Error(`No result containing "Europe" found at index ${clickElementIndex}`);
    }
  }

  async searchFor(searchFor: string) {
    await this.page.locator(this.searchField).click();
    await this.page.fill(this.searchField, searchFor);
    await this.page.locator(this.searchField).press('Enter');
  }

  async clickOnTourDropdownItem(tourType: DropdownOptions) {
    const dropdownItem = await this.page.locator(`ul.dropdown-menu a:has-text("${tourType}")`);

    if (await dropdownItem.isVisible()) {
      await dropdownItem.click();
    } else {
      throw new Error(`Dropdown item with text "${tourType}" not found`);
    }
  }

}
