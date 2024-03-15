import 'chromedriver';
import 'geckodriver';
import { WebDriver } from 'selenium-webdriver';
import {LaunchOptions} from '@shared/domain/utils/launchOptions';
import { IBrowserManager } from '@web-client/core/domain/IBrowserManager';
import { BrowserFactory } from './factories/browserFactory';

class BrowserManager implements IBrowserManager {
  static browser: WebDriver;

  async openBrowser(launchOptions: LaunchOptions): Promise<void> {
    BrowserManager.browser = await BrowserFactory.createBrowser(launchOptions);
  }

  async closeBrowser(): Promise<void> {
    await BrowserManager.browser.quit();
  }

  async navigateTo(url: string): Promise<void> {
    await BrowserManager.browser.navigate().to(url);
  }

  async takeScreenshot(): Promise<string> {
    return await BrowserManager.browser.takeScreenshot();
  }

  getBrowser(): WebDriver {
    return BrowserManager.browser;
  }
}

const browserManager: BrowserManager = Object.freeze(new BrowserManager());

export { browserManager };
