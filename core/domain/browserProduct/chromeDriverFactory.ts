import { Builder, WebDriver } from 'selenium-webdriver';
import { Options as ChromeOptions } from 'selenium-webdriver/chrome';
import {LaunchOptions} from '@shared/domain/utils/launchOptions';
import { IWebDriver } from '@web-client/core/domain/IWebDriver';

class GChromeDriverFactory implements IWebDriver {
  createBrowser(launchOptions: LaunchOptions): WebDriver {
    const opt = this.createChromeOptions(launchOptions);
    return new Builder().forBrowser('chrome').setChromeOptions(opt).build();
  }
  private createChromeOptions(launchOptions: LaunchOptions): ChromeOptions {
    const opt = new ChromeOptions();
    if (launchOptions.headless) opt.headless();
    opt.addArguments(`--lang=${launchOptions.language}`);
    opt.addArguments('allow-file-access-from-files');
    opt.addArguments('use-fake-device-for-media-stream');
    opt.addArguments('use-fake-ui-for-media-stream');
    opt.windowSize(launchOptions.size);
    return opt;
  }
}

export { GChromeDriverFactory };
