// navigationPage.ts
import { Page, expect } from '@playwright/test';
import { PageBase } from '../PageBase';

export class ReviewPage extends PageBase {

    constructor(page: Page) {
        super(page);
    }

    readonly fileUploadButton = '#photograph';
    readonly nextStepButtonSelector = 'input[type="submit"][value="Confirm Booking"]';
    readonly previousStepButtonSelector = 'input[type="submit"][value="Previous step"]';


    async uploadFile(filePath: string) {
        await this.page.locator(this.fileUploadButton).setInputFiles(filePath);
      }
      
    async clickNextStepButton() {
        await this.page.locator(this.nextStepButtonSelector).click();
        await this.page.waitForTimeout(2000);
    }

    async clickPreviousStepButton() {
        await this.page.locator(this.previousStepButtonSelector).click();
    }

}
