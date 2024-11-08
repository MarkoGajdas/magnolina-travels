// navigationPage.ts
import { Page, expect } from '@playwright/test';
import { PageBase } from '../../../BasePage';
import { URLS_TOURS } from '../../../../constants/urls';

export class HutToHutPage extends PageBase {

  constructor(page: Page) {
    super(page);
  }

  async verifyHutToHutPage() {
    await this.verifyPageLoad(
        URLS_TOURS.TOUR_HUT_TO_HUT.TITLE,
        URLS_TOURS.TOUR_HUT_TO_HUT.URL)
  }

  async verifyProperties(label: string, expectedValue: string) {
        const propertyValue = await this.page.locator(`.product-property >> .property-label:text("${label}") >> .. >> .property-value`);
      
        const valueText = await propertyValue.innerText();
      
        if (valueText.trim() !== expectedValue) {
          throw new Error(`Expected value for "${label}" to be "${expectedValue}", but got "${valueText}"`);
        }
      }
      
}
