import { Locator, WebElement } from 'selenium-webdriver';

interface IActions {
  /**
   *
   * @param locator locator of the element to be clicked
   */
  click(locator: Locator): Promise<void>;
  /**
   *
   * @param button
   * @param locator locator of the element to be right clicked
   */
  rightClick(locator: Locator): Promise<void>;
  /**
   *
   * @param locator locator of the element to send the key to
   * @param {string} key the key to press
   */
  pressKey(locator: Locator, key: string): Promise<void>;
  /**
   * Hovers over an element
   * @param locator locator where the mouse will hover
   */
  hover(locator: Locator): Promise<void>;
  /**
   * Deletes text from an input field
   * @param locator locator of the element to delete text from
   */
  deleteText(locator: Locator): Promise<void>;
  /**
   *
   * @param locator locator of the element to get attribute from
   * @param {string} name attribute name to get the value for
   */
  getAttribute(locator: Locator, name: string): Promise<null | string>;
  /**
   * Writes text on an input field
   * @param locator locator of the element to write text into
   * @param text text to be entered in field
   */
  setText(locator: Locator, text: string): Promise<void>;
  /**
   *
   * @param locator locator of the elements to get
   */
  getAll(locator: Locator): Promise<Array<WebElement>>;
  /**
   *
   * @param locator locator of the element to get text from
   */
  getText(locator: Locator): Promise<string>;
  /**
   *
   * @param locator locator of the element to scroll to
   */
  navigateTo(url: string): Promise<void>;
  /**
   * Selects an element located in a dropdownlist
   * @param dropDownList the locator of the dropdown list
   * @param elementInDropDown the specific element in the ddl do you want to select
   */
  setDropDown(dropDownList: Locator, elementInDropDown: Locator): Promise<void>;
  /**
   *
   * @param locator locator of the element to scroll to
   */
  scrollTo(locator: Locator): Promise<void>;
  /**
   * Gets the text from all elements matching a locator and returns an array
   * @param locator the locator pointing to the elements to get the text from
   */
  getAllTexts(locator: Locator): Promise<string[]>;
}

export { IActions };
