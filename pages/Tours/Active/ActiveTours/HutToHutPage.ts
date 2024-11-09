// navigationPage.ts
import { Page, expect } from '@playwright/test';
import { URLS_TOURS } from '../../../../constants/urls';
import { ToursActivePage } from '../ToursActivePage';

export class HutToHutPage extends ToursActivePage {

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
