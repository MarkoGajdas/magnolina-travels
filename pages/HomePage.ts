import { Page, expect } from '@playwright/test';
import { PageBase } from './PageBase';
import { URLS_BASE_PAGES, URLS_SUBPAGES } from '../constants/urls';

export class HomePage extends PageBase {

  constructor(page: Page) {
    super(page);
  }

  readonly homeLogo = 'selector-for-home-nav';

  readonly navTours = '.nav.navbar-nav >> text=Tours';
  readonly navStories = '.nav.navbar-nav >> text=Stories';
  readonly navAbout = '.nav.navbar-nav >> text=About';
  readonly navContact = '.nav.navbar-nav >> text=Contact';
  readonly navMembers = '.nav.navbar-nav >> text=Members';

  readonly languageEng = '#language-link ul li a[title="English"]';
  readonly languageGer = '#language-link ul li a[title="German"]';

  readonly searchField = '#nav-search';
  readonly searchListOfExpectedItems = '.list-group-item';


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

  async navigateToToursSubpages() {
    await this.page.click(this.navTours);
  }

  async verfyEachTourSubpage() {
    //Note: Not this methode check only 2 destinations, easy extendable if you add title and URL to urls.ts in NAV_TOURS_URLS
    await this.verifySubpages(URLS_SUBPAGES.NAV_TOURS_URLS);
  }

  async verifyDestinationsSubpages() {
    //Note: Not this methode check only 2 destinations, easy extendable if you add title and URL to urls.ts in NAV_DESTINATIONS_URLS
    await this.verifySubpages(URLS_SUBPAGES.NAV_DESTINATIONS_URLS);
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

  async searchFor(searchFor: string) {
    await this.page.locator(this.searchField).click();
    await this.page.fill(this.searchField, searchFor);
    await this.page.locator(this.searchField).press('Enter');
  }

  async verifyAndClickSearchResult(searchFor: string, minExpectedResults: number, elementIndex: number) {

    if (await minExpectedResults < 0 || elementIndex < 0) {
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

    if (elementIndex >= resultCount || elementIndex < 0) {
      throw new Error(`Invalid elementIndex ${elementIndex}, should be between 0 and ${resultCount - 1}`);
    }

    const targetResult = targetResults.nth(elementIndex);

    if (await targetResult.isVisible()) {
      await targetResult.click();
    } else {
      throw new Error(`No result containing "Europe" found at index ${elementIndex}`);
    }
  }

}
