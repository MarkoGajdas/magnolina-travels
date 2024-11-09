// basePage.ts
import { Page, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';



export class PageBase {
  readonly page: Page;
  readonly usersPath = path.resolve(__dirname, '../config/users.json');
  readonly users = JSON.parse(fs.readFileSync(this.usersPath, 'utf-8'));

  constructor(page: Page) {
    this.page = page;
  }


  async verifyPageLoad(expectedTitle: string, expectedUrl) {
    await this.page.waitForLoadState('load', { timeout: 15000 });
    await expect(this.page).toHaveTitle(expectedTitle);
    await expect(this.page).toHaveURL(expectedUrl);
  }

  async scrollToBottom() {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }


  async verifySubpages(subPages: { url: string; title: string }[]) {

    // Loop through each URL in the provided subPages array and verify it
    for (const page of subPages) {
      await this.page.goto(page.url);
      await expect(this.page).toHaveURL(page.url);
      await expect(this.page).toHaveTitle(page.title);
      await this.page.waitForTimeout(2000);
    }
  }

  async waitForElement(selector: string, timeout: number = 15000) {
    try {
      await this.page.waitForSelector(selector, { timeout });
    } catch (error) {
      throw new Error(`Element with selector "${selector}" did not appear within ${timeout / 1000} seconds`);
    }
  }

}
