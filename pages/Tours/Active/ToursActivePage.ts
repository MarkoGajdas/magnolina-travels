// navigationPage.ts
import { Page, expect } from '@playwright/test';
import { PageBase } from '../../PageBase';
import { URLS_TOURS_TYPE } from '../../../constants/urls';

export class ToursActivePage extends PageBase {

  constructor(page: Page) {
    super(page);
  }

  readonly buttonBookTour = 'input[value="Book Tour"]';


  async clickOnBookTour() {
    await this.page.locator(this.buttonBookTour).click();
  }

  async verifyToursActivePage() {
    await this.verifyPageLoad(
        URLS_TOURS_TYPE.ACTIVE.TITLE,
        URLS_TOURS_TYPE.ACTIVE.URL)
  }

  async  clickViewTourByHref(href: string) {
    const viewTourButton = await this.page.locator(
      `a.tour-card-anchor[href="${href}"] >> div.card-button >> .btn.btn-primary`
    );
  
    if (await viewTourButton.isVisible()) {
      await viewTourButton.click();
    } else {
      throw new Error(`View Tour button for "${href}" not found or is not visible`);
    }
  }

}
