// navigationPage.ts
import { Page, expect } from '@playwright/test';
import { PageBase } from './PageBase';
import {URLS_BASE_PAGES} from '../constants/urls';

export class ContactPage extends PageBase {

  constructor(page: Page) {
    super(page);
  }

  async verifyContactPage() {
    await this.verifyPageLoad(
      URLS_BASE_PAGES.CONTACT_PAGE.TITLE,
      URLS_BASE_PAGES.CONTACT_PAGE.URL)
  }


}
