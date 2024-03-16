import { Locator } from 'selenium-webdriver';

interface IConditions {
  /**
   * Creates a condition that will wait for the given element to become visible
   * @param locator to search for an element.
   * @param time How long to wait for the condition to be true, in milliseconds.
   */
  isVisible(locator: Locator, time?: number): Promise<void>;

  /**
   * Creates a condition that will loop until an element is ./WebDriver#findElement found with the given locator.
   * @param locator to search for an element.
   */
  isLocated(locator: Locator): Promise<void>;

  /**
   * Creates a condition that will wait for the given element to be enabled.
   * @param locator  to search for an element.
   * @param time How long to wait for the condition to be true, in milliseconds.
   */
  isEnabled(locator: Locator, time?: number): Promise<void>;

  /**
   * Creates a condition that will wait for the given element to be disabled
   * @param locator to search for an element.
   * @param time How long to wait for the condition to be true, in milliseconds.
   */
  isDisabled(locator: Locator, time?: number): Promise<void>;

  /**
   * Creates a condition that will wait for the given element to become stale
   * @param locator to search for an element.
   * @param time How long to wait for the condition to be true, in milliseconds.
   */
  isStale(locator: Locator, time?: number): Promise<void>;

  /**
   * Creates a condition that will wait for the given element to stop being visible
   * @param locator to search for an element.
   * @param time How long to wait for the condition to be true, in milliseconds.
   */
  isNotVisible(locator: Locator, time?: number): Promise<void>;

  /**
   * Creates a condition that will wait for the current page's url to match the given value.
   * @param expectedUrl to see if is the currentUrl.
   * @param time How long to wait for the condition to be true, in milliseconds.
   */
  isUrl(expectedUrl: string, time?: number): Promise<void>;

  /**
   * Returns true if the web element is displayed and false if it is not.
   * @param Locator to verify if is Displayed.
   */
  isDisplayed(locator: Locator): Promise<boolean>;
}

export { IConditions };
