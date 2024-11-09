// navigationPage.ts
import { Page, expect } from '@playwright/test';
import { PageBase } from './PageBase';
import {URLS_BASE_PAGES} from '../constants/urls';

export class AboutPage extends PageBase {

  constructor(page: Page) {
    super(page);
  }

  async verifyAboutPage() {
    await this.verifyPageLoad(
      URLS_BASE_PAGES.ABOUT_PAGE.TITLE,
      URLS_BASE_PAGES.ABOUT_PAGE.URL)
  }

}
