import { conditions } from '@core/infrastructure/utils/conditions';
import { By } from 'selenium-webdriver';
import { actions } from '@core/infrastructure/utils/actions';

class LoginPage {
  txtLogin = By.css('h1[id="kc-page-title"]');
  iptUsername = By.css('input[id="username"]');
  iptPassword = By.css('input[id="password"]');
  btnSignIn = By.css('input#kc-login');

  async clickLogin(): Promise<void> {
    await conditions.isEnabled(this.btnSignIn);
    await actions.click(this.btnSignIn);
  }

}

const loginPage: LoginPage = Object.freeze(new LoginPage());
export { loginPage };
