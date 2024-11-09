// navigationPage.ts
import { Page, expect } from '@playwright/test';
import { PageBase } from './PageBase';
import { URLS_BASE_PAGES } from '../constants/urls';

export class StoriesPage extends PageBase {

  constructor(page: Page) {
    super(page);
  }

  async verifyStoriesPage() {
    await this.verifyPageLoad(
      URLS_BASE_PAGES.STORIES_PAGE.TITLE,
      URLS_BASE_PAGES.STORIES_PAGE.URL)
  }

}
