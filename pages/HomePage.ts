import { Page, expect } from '@playwright/test';
import { PageBase } from './PageBase';
import { URLS_BASE_PAGES, URLS_SUBPAGES } from '../constants/urls';
import { DROPDOWN_LOCATORS } from '../constants/dropdowns';

export class HomePage extends PageBase {
  
  constructor(page: Page) {
    super(page);
  }
  

  async verifyHomePageGer() {
    await this.verifyPageLoad(
      URLS_BASE_PAGES.HOME_PAGE.TITLE_DE,
      URLS_BASE_PAGES.HOME_PAGE.URL_DE);
  }

  async verifyHomePage() {
    await this.verifyPageLoad(
      URLS_BASE_PAGES.HOME_PAGE.TITLE,
      URLS_BASE_PAGES.HOME_PAGE.URL);
  }

  async clickOnTourDropdownItem(itemText: string) {
    const dropdownItem = await this.page.locator(`ul.dropdown-menu a:has-text("${itemText}")`);

    if (await dropdownItem.isVisible()) {
      await dropdownItem.click();
    } else {
      throw new Error(`Dropdown item with text "${itemText}" not found`);
    }
  }

  async verifyToursDropDown() {
    await this.verifyDropDownPages(DROPDOWN_LOCATORS.DROPDOWN_LOCATOR_TOURS, URLS_SUBPAGES.NAV_TOURS_URLS);
  }

  async verifyDestinationsDropDown() {
    await this.verifyDropDownPages(DROPDOWN_LOCATORS.DROPDOWN_LOCATOR_DESTINATIONS, URLS_SUBPAGES.NAV_DESTINATIONS_URLS);
  }

  async searchFor(searchFor: string) {
    await this.page.locator(this.searchField).click();
    await this.page.fill(this.searchField, searchFor);
    await this.page.locator(this.searchField).press('Enter');
  }

  async verifyAndClickSearchResult(searchFor: string, minExpectedResults: number, clickElementIndex: number) {

    if (await minExpectedResults < 0 || clickElementIndex < 0) {
      throw new Error(`Number of expected results/ or index of item can't be less then 0.`);
    }

    await this.searchFor(searchFor);
    const results = await this.page.locator(this.searchListOfExpectedItems);

    const resultCount = await results.count();
    if (resultCount < minExpectedResults) {
      throw new Error(`Less than ${minExpectedResults} search results found`);
    }

    // Find the specified result containing the term "Europe"
    const targetResults = await this.page.locator(this.searchListOfExpectedItems)
      .locator('span.excerpt-fragment')
      .filter({ hasText: searchFor });

    if (clickElementIndex >= resultCount || clickElementIndex < 0) {
      throw new Error(`Invalid elementIndex ${clickElementIndex}, should be between 0 and ${resultCount - 1}`);
    }

    const targetResult = targetResults.nth(clickElementIndex);

    if (await targetResult.isVisible()) {
      await targetResult.click();
    } else {
      throw new Error(`No result containing "Europe" found at index ${clickElementIndex}`);
    }
  }

}
