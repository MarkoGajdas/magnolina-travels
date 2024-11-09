// navigationPage.ts
import { Page, expect } from '@playwright/test';
import { PageBase } from '../PageBase';

export class MealPage extends PageBase {

    constructor(page: Page) {
        super(page);
    }

    readonly mealRadioButton = '#mealOptions_';
    readonly mealRadioButton1 = '#mealOptions_0';
    readonly mealRadioButton2 = '#mealOptions_1';
    readonly mealRadioButton3 = '#mealOptions_2';
    readonly mealRadioButton4 = '#mealOptions_3';
    readonly mealRadioButton5 = '#mealOptions_4';
    readonly mealRadioButton6 = '#mealOptions_5';

    readonly mealNotesTextField = '#additionalMealNotes';
    readonly nextStepButtonSelector = 'input[type="submit"][value="Next step"]';
    readonly previousStepButtonSelector = 'input[type="submit"][value="Previous step"]';

    async setAdditionalMealNotes(mealNotes: string) {
        await this.page.locator(this.mealNotesTextField).click();
        await this.page.locator(this.mealNotesTextField).fill(mealNotes);
    }

    async clickMealRadioButton(radioButtonNum: number) {
        let tempNum = radioButtonNum.toString();
        await this.page.locator(this.mealRadioButton + tempNum).click();
    }

    async clickNextStepButton() {
        await this.page.locator(this.nextStepButtonSelector).click();
        await this.page.waitForTimeout(2000);
    }

    async clickPreviousStepButton() {
        await this.page.locator(this.previousStepButtonSelector).click();
    }

}
