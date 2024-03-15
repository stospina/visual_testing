import { Builder, WebDriver } from 'selenium-webdriver';
import { Options as FirefoxOptions } from 'selenium-webdriver/firefox';
import {LaunchOptions} from '@shared/domain/utils/launchOptions';
import { IWebDriver } from '@web-client/core/domain/IWebDriver';

class FirefoxDriverFactory implements IWebDriver {
  createBrowser(launchOptions: LaunchOptions): WebDriver {
    const opt = this.createFirefoxOptions(launchOptions);
    return new Builder().forBrowser('firefox').setFirefoxOptions(opt).build();
  }
  private createFirefoxOptions(launchOptions: LaunchOptions): FirefoxOptions {
    const opt = new FirefoxOptions();
    if(launchOptions.headless) opt.headless();
    opt.addArguments(`--lang=${launchOptions.language}`);
    opt.windowSize(launchOptions.size);
    return opt;
  }
}

export { FirefoxDriverFactory };
