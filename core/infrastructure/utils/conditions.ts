import { IConditions } from '@core/domain/IConditions';
import { browserManager } from '@core/infrastructure/browserManager';
import { Locator, until, WebDriver, WebElement } from 'selenium-webdriver';
import { logger } from '@core/infrastructure/logger.Manager';

class Conditions implements IConditions {
  public async isLocated(locator: Locator, time?: number): Promise<void> {
    logger.debug(`Waiting for ${locator.toString()} to be Located`);
    await browserManager.getBrowser().wait(until.elementLocated(locator), time);
  }

  public async isVisible(locator: Locator, time?: number): Promise<void> {
    logger.debug(`Waiting for ${locator.toString()} to be Visible`);
    await browserManager
      .getBrowser()
      .wait(until.elementIsVisible(await browserManager.getBrowser().findElement(locator)), time);
  }

  public async isEnabled(locator: Locator, time?: number): Promise<void> {
    logger.debug(`Waiting for ${locator.toString()} to be Enabled`);
    await browserManager
      .getBrowser()
      .wait(until.elementIsEnabled(await browserManager.getBrowser().findElement(locator)), time);
  }

  public async isDisabled(locator: Locator, time?: number): Promise<void> {
    logger.debug(`Waiting for ${locator.toString()} to be Disabled`);
    await browserManager
      .getBrowser()
      .wait(until.elementIsDisabled(browserManager.getBrowser().findElement(locator)), time);
  }

  public async isStale(locator: Locator, time?: number): Promise<void> {
    logger.debug(`Waiting for ${locator.toString()} to become stale`);
    await browserManager.getBrowser().wait(until.stalenessOf(browserManager.getBrowser().findElement(locator)), time);
  }

  public async isUrl(expectedUrl: string, time?: number): Promise<void> {
    logger.debug(`Waiting for the currentUrl to be the ${expectedUrl}`);
    await browserManager.getBrowser().wait(until.urlIs(expectedUrl), time);
  }

  public async isNotVisible(locator: Locator, time?: number): Promise<void> {
    logger.debug(`Waiting for ${locator.toString()} to stop being Visible`);
    await browserManager
      .getBrowser()
      .wait(until.elementIsNotVisible(browserManager.getBrowser().findElement(locator)), time);
  }

  public async isDisplayed(locator: Locator): Promise<boolean> {
    logger.debug(`Verifying if the element ${locator.toString} is displayed`);
    try {
      return await browserManager.getBrowser().findElement(locator).isDisplayed();
    } catch {
      return false;
    }
  }

  public async waitForelementPresence(driver: WebDriver, locator: Locator, timeout: number): Promise<void> {
    await browserManager.getBrowser().wait( async () => {
      const elements = await driver.findElements(locator);
      return elements.length > 0;
    }, timeout);
  }

  public async getShadowElement(shadowHostLocator:Locator, shadowElement: Locator): Promise<WebElement> {
    const shadowRoot = await browserManager.getBrowser().findElement(shadowHostLocator).getShadowRoot();
    logger.debug('SHADOW ROOT: ', shadowRoot);
    const element = await shadowRoot.findElement(shadowElement);
    logger.debug('SHADOW ELEMENT: ', element);
    return element;
  }
}

const conditions: Conditions = Object.freeze(new Conditions());
export { conditions };
