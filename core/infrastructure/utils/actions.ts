import { IActions } from '@web-client/core/domain/IAction';
import { browserManager } from '@web-client/core/infrastructure/browserManager';
import { Key, Locator, until, WebElement } from 'selenium-webdriver';
import { logger } from '@shared/infrastructure/logger.Manager';

class Actions implements IActions {
  public async click(locator: Locator): Promise<void> {
    logger.debug(`Clicking on ${locator.toString()}`);
    await browserManager.getBrowser().findElement(locator).click();
  }

  public async rightClick(locator: Locator): Promise<void> {
    logger.debug(`Right clicking on ${locator.toString()}`);
    await browserManager
      .getBrowser()
      .actions({ bridge: true })
      .contextClick(browserManager.getBrowser().findElement(locator))
      .perform();
  }

  public async pressKey(locator: Locator, key: string): Promise<void> {
    logger.debug(`Pressing ${key} on ${locator.toString()}`);
    await browserManager.getBrowser().findElement(locator).sendKeys(key);
  }

  public async hover(locator: Locator): Promise<void> {
    logger.debug(`Hovering ${locator.toString()}`);
    await browserManager
      .getBrowser()
      .actions({ bridge: true })
      .move({
        duration: 1000,
        origin: browserManager.getBrowser().findElement(locator),
        x: 0,
        y: 0,
      })
      .perform();
  }

  public async deleteText(locator: Locator): Promise<void> {
    logger.debug(`Deleting text from ${locator.toString()}`);
    await browserManager.getBrowser().findElement(locator).sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
  }

  public async getAttribute(locator: Locator, name: string): Promise<string | null> {
    logger.debug(`Getting ${name} from ${locator.toString()}`);
    return await browserManager.getBrowser().findElement(locator).getAttribute(name);
  }

  public async setText(locator: Locator, text: string): Promise<void> {
    logger.debug(`Writing ${text} on ${locator.toString()}`);
    await browserManager.getBrowser().findElement(locator).sendKeys(text);
  }

  public async overwrite(locator: Locator, text: string): Promise<void> {
    logger.debug(`Overwriting ${text} on ${locator.toString()}`);
    await browserManager.getBrowser().findElement(locator).clear();
    await browserManager.getBrowser().findElement(locator).sendKeys(text);
  }

  public async getAll(locator: Locator): Promise<Array<WebElement>> {
    logger.debug(`Getting all ${locator.toString()}`);
    return await browserManager.getBrowser().findElements(locator);
  }

  public async getText(locator: Locator): Promise<string> {
    logger.debug(`Getting text ${locator.toString()}`);
    return await browserManager.getBrowser().findElement(locator).getText();
  }

  public async navigateTo(url: string): Promise<void> {
    logger.debug(`Navigating to ${url}`);
    await browserManager.navigateTo(url);
  }

  public async writeDown(keydownMessage: string): Promise<void> {
    const actions = browserManager.getBrowser().actions();
    await actions.sendKeys(keydownMessage).perform();
  }

  public async setDropDown(dropDownList: Locator, elementInDropDown: Locator): Promise<void> {
    logger.debug(`Selecting the element ${elementInDropDown} from the list ${dropDownList}`);
    await browserManager.getBrowser().findElement(dropDownList).click();
    logger.debug(`waiting for element ${dropDownList} in ddl to be visible`);
    await browserManager
      .getBrowser()
      .wait(until.elementIsVisible((await browserManager.getBrowser()).findElement(elementInDropDown)));
    logger.debug(`clicking in ${dropDownList}`);
    await browserManager.getBrowser().findElement(elementInDropDown).click();
  }

  public async scrollTo(locator: Locator): Promise<void> {
    logger.debug(`Scrolling to ${locator.toString()}`);
    const element: WebElement = await browserManager.getBrowser().findElement(locator);
    await browserManager.getBrowser().executeScript('arguments[0].scrollIntoView()', element);
  }

  public async getAllTexts(locator: Locator): Promise<string[]> {
    logger.debug(`getting all text content from elements ${locator}`);
    const allElements: WebElement[] = await browserManager.getBrowser().findElements(locator);
    const allTexts: string[] = [];
    for (const element of allElements) {
      const text: string = await element.getText();
      allTexts.push(text);
    }
    logger.trace(`text found: ${allTexts}`);
    return allTexts;
  }

  public async messageBreakLine(locator: Locator, message: string): Promise<void> {
    const newMessage = message.replaceAll('\n', Key.chord(Key.SHIFT, Key.ENTER));
    await browserManager.getBrowser().findElement(locator).sendKeys(newMessage);
  }
}

const actions: Actions = Object.freeze(new Actions());
export { actions };
