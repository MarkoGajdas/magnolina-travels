import { Page, expect } from '@playwright/test';
import { PageBase } from './PageBase';
import { URLS_BASE_PAGES } from '../constants/urls';


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

}
