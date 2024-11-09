// navigationPage.ts
import { Page, expect } from '@playwright/test';
import { PageBase } from '../PageBase';

export class PersonalDetailsPage extends PageBase {

    constructor(page: Page) {
        super(page);
    }

    readonly titleTextField = '#title';
    readonly firstNameTextField = '#firstName';
    readonly lastNameTextField = '#lastName';
    readonly emailTextField = '#email';
    readonly phoneTextField = '#phone';
    readonly cityTextField = '#city';
    readonly postalTextField = '#postalOrZip';
    readonly countryTextField = '#country';
    readonly provinceTextField = '#province';

    readonly nextStepButtonSelector = 'input[type="submit"][value="Next step"]';
    readonly previousStepButtonSelector = 'input[type="submit"][value="Previous step"]';

    async setTitleField(title: string) {
        await this.page.locator(this.titleTextField).click();
        await this.page.locator(this.titleTextField).fill(title);
    }

    async setFirstNameField(firstName: string) {
        await this.page.locator(this.firstNameTextField).click();
        await this.page.locator(this.firstNameTextField).fill(firstName);
    }

    async setLastNameField(lastName: string) {
        await this.page.locator(this.lastNameTextField).click();
        await this.page.locator(this.lastNameTextField).fill(lastName);
    }

    async setEmailField(email: string) {
        await this.page.locator(this.emailTextField).click();
        await this.page.locator(this.emailTextField).fill(email);
    }

    async setPhoneField(phone: string) {
        await this.page.locator(this.phoneTextField).click();
        await this.page.locator(this.phoneTextField).fill(phone);
    }

    async setCityField(city: string) {
        await this.page.locator(this.cityTextField).click();
        await this.page.locator(this.cityTextField).fill(city);
    }

    async setPostalCodeField(postal: string) {
        await this.page.locator(this.postalTextField).click();
        await this.page.locator(this.postalTextField).fill(postal);
    }

    async setCountryField(country: string) {
        await this.page.locator(this.countryTextField).click();
        await this.page.locator(this.countryTextField).fill(country);
    }
    
    async setProvinceField(province: string) {
        await this.page.locator(this.provinceTextField).click();
        await this.page.locator(this.provinceTextField).fill(province);
    }

    async clickNextStepButton() {
        await this.page.locator(this.nextStepButtonSelector).click();
        await this.page.waitForTimeout(2000);
    }

    async clickPreviousStepButton() {
        await this.page.locator(this.previousStepButtonSelector).click();
    }

}
