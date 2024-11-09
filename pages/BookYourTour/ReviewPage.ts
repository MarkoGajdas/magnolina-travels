// navigationPage.ts
import { Page, expect } from '@playwright/test';
import { PageBase } from '../PageBase';

export class ReviewPage extends PageBase {

    constructor(page: Page) {
        super(page);
    }

    readonly fileUploadButton = '#photograph';
    readonly confirmButtonSelector = 'input[type="submit"][value="Confirm Booking"]';
    readonly previousStepButtonSelector = 'input[type="submit"][value="Previous step"]';
    readonly errorMessage = 'text=Internal error, form could not be sent';
    readonly confirmedMessage = 'text=Booking confirmed';


    async uploadFile(filePath: string) {
        await this.page.locator(this.fileUploadButton).setInputFiles(filePath);
    }

    async clickConfirmButton() {
        await this.page.locator(this.confirmButtonSelector).click();
        await this.page.waitForTimeout(2000);
    }

    async clickPreviousStepButton() {
        await this.page.locator(this.previousStepButtonSelector).click();
    }

    async verifyNoErrorMessage() {
        try {
            const errorMessageLocator = this.page.locator(this.errorMessage);
            await expect(errorMessageLocator).not.toBeVisible();
        } catch (e) {
            throw new Error('Unexpected error message: "Internal error, form could not be sent"');
        }
    }

    async verifySuccessMessage() {
        const errorMessageLocator = this.page.locator(this.errorMessage);
        await expect(errorMessageLocator).toBeVisible();
    }

}
