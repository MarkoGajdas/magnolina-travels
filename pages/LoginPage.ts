import { Page, expect } from '@playwright/test';
import { PageBase } from './BasePage';
import { URLS_BASE_PAGES } from '../constants/urls'

export class LoginPage extends PageBase {
    
    constructor(page: Page) {
        super(page);
    }

    readonly usernameInput = 'input[id="username"]';
    readonly passwordInput = 'input[id="password"]';
    readonly loginButtonLocator = 'button >> text=/login/i';
    readonly pageTitleUserLoggedIn = 'Log in';
    readonly textLoginVerify = 'Welcome, superuser.';

    async gotoLoginPage() {
        await this.page.goto(URLS_BASE_PAGES.LOGIN_PAGE.URL);
    }

    async clicOnLoginButton(){
        await this.page.locator(this.loginButtonLocator).click();
    }
    
    async loginAndVerify(userRole:string){
        await this.verifyPageLoad(URLS_BASE_PAGES.LOGIN_PAGE.TITLE, URLS_BASE_PAGES.LOGIN_PAGE.URL);
        await this.login(userRole);
        await this.verifyUserIsLoggedIn();

    }

    async login(userRole: keyof typeof this.users) {
        let user = this.users[userRole];
        await this.page.fill(this.usernameInput, user.username);
        await this.page.fill(this.passwordInput, user.password);
        await this.clicOnLoginButton();

    }

    async verifyUserIsLoggedIn() {
        await expect(this.page).toHaveTitle(URLS_BASE_PAGES.LOGIN_PAGE.TITLE_LOGIN);
        await expect(this.page).toHaveURL(URLS_BASE_PAGES.LOGIN_PAGE.URL);
        await expect(this.page.locator(`text=${this.textLoginVerify}`)).toBeVisible();
    }
    
    async verifyThatLoginPageLoaded() {
        await expect(this.page).toHaveTitle(URLS_BASE_PAGES.LOGIN_PAGE.TITLE);
        await expect(this.page).toHaveURL(URLS_BASE_PAGES.LOGIN_PAGE.URL);
    }

}
