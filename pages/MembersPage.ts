// navigationPage.ts
import { Page, expect } from '@playwright/test';
import { PageBase } from './BasePage';
import { URLS_BASE_PAGES } from '../constants/urls';

export class MembersPage extends PageBase {

  constructor(page: Page) {
    super(page);
  }

  async verifyMembersPage() {
    await this.verifyPageLoad(
      URLS_BASE_PAGES.MEMBERS_PAGE.TITLE
      ,URLS_BASE_PAGES.MEMBERS_PAGE.URL)
  }


}
