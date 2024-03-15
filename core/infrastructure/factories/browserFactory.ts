import { WebDriver } from 'selenium-webdriver';
import { GChromeDriverFactory } from '@web-client/core/domain/browserProduct/chromeDriverFactory';
import { FirefoxDriverFactory } from '@web-client/core/domain/browserProduct/firefoxDriverFactory';
import {LaunchOptions} from '@shared/domain/utils/launchOptions';

class BrowserFactory {
  static createBrowser(launchOptions: LaunchOptions): WebDriver {
    let factory;
    if (launchOptions.browser === 'chrome') {
      factory = new GChromeDriverFactory();
    } else if (launchOptions.browser === 'firefox') {
      factory = new FirefoxDriverFactory();
    } else {
      throw new Error(`Unsupported browser: ${launchOptions.browser}`);
    }
    return factory.createBrowser(launchOptions);
  }
}

export { BrowserFactory };
