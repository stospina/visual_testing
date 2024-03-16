
import {LaunchOptions} from '@shared/domain/utils/launchOptions';

interface IBrowserManager {
  /**
   * Creates an instance of a browser
   * @param launchOptions Options the browser is gonna open with
   */
  openBrowser(launchOptions: LaunchOptions): void;

  /**
   * Closes the browser and all of its pages
   */
  closeBrowser(): void;

  /**
   * Redirects to a page
   * @param url the link of the page to redirect to
   */
  navigateTo(url: string): void;

  /**
   * Takes a screenshot of the page
   */
  takeScreenshot(): Promise<string>;
}

export { IBrowserManager };
