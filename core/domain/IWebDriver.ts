/**
 * Interface that defines how the Web Driver behaves
 */
import { WebDriver } from 'selenium-webdriver';
import { LaunchOptions } from '@shared/domain/utils/launchOptions';

interface IWebDriver {
  /**
   * Creates a new browser according to the capabilities setted in launchOptions
   * @param launchOptions with the capabilities for the new browser.
   */
  createBrowser(launchOptions: LaunchOptions): WebDriver;
}

export { IWebDriver };
