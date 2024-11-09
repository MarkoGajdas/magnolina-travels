// navigationPage.ts
import { Page, expect } from '@playwright/test';
import { PageBase } from '../PageBase';

export class BookYourTourPage extends PageBase {

    constructor(page: Page) {
        super(page);
    }

    readonly adultsFieldSelector = '#adults';
    readonly youthFieldSelector = '#youth';

    readonly upgradeCheckbox1 = '#upgrades_0';
    readonly upgradeCheckbox2 = '#upgrades_1';
    readonly upgradeCheckbox3 = '#upgrades_2';

    readonly mealDropdownSelector = '#meal';
    readonly yesOptionValue = 'yes';
    readonly noOptionValue = 'no'; 

    readonly nextStepButtonSelector = 'input[type="submit"][value="Next step"]';




    async setNumberOfAdults(adultsNumber: number) {
        let tempNum = adultsNumber.toString();
        await this.page.locator(this.adultsFieldSelector).click();
        await this.page.locator(this.adultsFieldSelector).fill(tempNum);
    }

    async setNumberOfYouth(adultsNumber: number) {
        let tempNum = adultsNumber.toString();
        await this.page.locator(this.youthFieldSelector).click();
        await this.page.locator(this.youthFieldSelector).fill(tempNum);
    }

    async checkUpgrade1Checkbox() {
        await this.page.locator(this.upgradeCheckbox1).check();
    }

    async checkUpgrade2Checkbox() {
        await this.page.locator(this.upgradeCheckbox2).check();
    }

    async checkUpgrade3Checkbox() {
        await this.page.locator(this.upgradeCheckbox3).check();
    }

    async selectYesOption() {
        await this.page.locator(this.mealDropdownSelector).selectOption({ value: this.yesOptionValue });
    }

    async selectNoOption() {
        await this.page.locator(this.mealDropdownSelector).selectOption({ value: this.noOptionValue });
    }

    async clickNextStepButton() {
        await this.page.locator(this.nextStepButtonSelector).click();
    }


}
