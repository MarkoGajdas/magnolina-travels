import { Page, expect } from '@playwright/test';
import { URLS_BASE_PAGES, URLS_SUBPAGES } from '../constants/urls';
import * as fs from 'fs';
import * as path from 'path';

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

  readonly searchListOfExpectedItems = '.list-group-item';
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

}
