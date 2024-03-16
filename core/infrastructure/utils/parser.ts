import { logger } from '@core/infrastructure/logger.Manager';
import dayjs from 'dayjs';

type parsedValue = null | boolean | undefined | string | number | any[];
type textToBeParsed = string | undefined | null;
type regex = RegExp | RegExpMatchArray | null;

/**
 * Parses a full locator from the POM to a string
 * @param locator Locator to be parsed
 * @returns The locator as a string
 */
function parseLocator(locator): string {
  logger.debug(`${locator.toString()}`);
  locator = locator.toString().split(',')[1];
  return locator.substring(1, locator.length - 1);
}

/**
 * Replaces in a string the values that are between parenthesis, replaces the values
 * if what is sent as keys contains a property with the same substring
 * @param {string} text the string where the values are to be replaced
 * @param {object} keys object that must contain the properties to be replaced in the string
 * @returns a string with the values between parentheses replaced
 */
function replaceKey(text: string, keys: object): string {
  const pattern: regex = RegExp(/\((.*?)\)/);
  let value: regex;
  do {
    value = text.match(pattern);
    if (value && keys[value[1]]) {
      text = text.replace(value[0], keys[value[1]]);
    }
  } while (value && keys[value[1]]);
  return text;
}

/**
 * Parses a string value to boolean, array of strings, number, string, null or boolean
 * @param {textToBeParsed} value text to be parsed
 * @returns the parsed string to either boolean, array of strings, number, string, null or boolean
 */
function parseValue(value: textToBeParsed): parsedValue {
  if (value === null || value === 'null') {
    return null;
  } else if (value?.startsWith('"') && value.endsWith('"')) {
    return value.substring(1, value.length - 1);
  }
  if (value?.startsWith('[') && value?.endsWith(']') && value?.length > 2) {
    const parsedValue: parsedValue = parseValue(value.substring(1, value.length - 1));
    return value.includes(',') ? parsedValue : [parsedValue];
  } else if (!isNaN(Number(value))) {
    return Number(value) >= 0 ? Number(value) : value;
  } else if (value === 'true') {
    return true;
  } else if (value === 'false') {
    return false;
  } else if (value === undefined) {
    return undefined;
  } else if (value.includes(',')) {
    return value.split(',');
  } else {
    return value;
  }
}

/**
 * Replaces the values between parenthesis in a datatable
 * @param {object} dataTable datatable where is gonna be replaced the values between parentheses
 * @param {object} keys an object that contains the values to be replaced in the datatable
 * @returns an object with all of his properties replaced with the values from the keys object
 */
function parseDataTable(dataTable: object, keys: object): object {
  for (const [k, v] of Object.entries(dataTable)) {
    dataTable[k] = k === 'id' ? replaceKey(v, keys) : parseValue(replaceKey(v, keys));
  }
  return dataTable;
}

/**
 * Replaces the values between parenthesis in a datatable
 * @param {object} dataTable datatable where the values are a date followed by the expected format
 * @param {object} keys an object that contains the values to be replaced in the datatable
 * @returns an object with all of his properties replaced with the values from the keys object and dates transformed to the specified format
 */
function parseDataTableWithDates(dataTable: object, keys: object): object {
  for (const [k, v] of Object.entries(dataTable)) {
    dataTable[k] = parseDateFormat(replaceKey(v, keys));
  }
  return dataTable;
}

/**
 *
 * @param value a string with a date and its format separated by commas
 * @returns the date formatted to the specified format
 */
function parseDateFormat(value) {
  logger.info(value.split(','));
  const [date, format] = value.split(',');
  return dayjs(date).format(format);
}

/**
 * Causes a property to become an object when it is presented between brackets and braces
 * @param {object} dataTable datatable which one of his properties is an object
 * @returns a datable with one of his properties as an object
 */
function replaceStringObjects(dataTable: object): object {
  const regexp: regex = RegExp('[[{]');
  for (const key in dataTable) {
    if (regexp.test(dataTable[key])) {
      const myObject: object = JSON.parse(dataTable[key]);
      dataTable[key] = myObject;
    }
  }
  return dataTable;
}

/**
 * Parses a table to an array of objects where the first row are keys and each of the next rows are values
 * @param table to be parsed
 * @returns the array of objects
 */
function parseDataTableWithKeys(table: string[][], keys: object): object[] {
  const bodyArray: object[] = [];
  const keysArray: string[] = table[0];
  for (let i = 1; i < table.length; i++) {
    const body: object = {};
    keysArray.forEach((key, index) => {
      body[key] = parseValue(replaceKey(table[i][index], keys));
    });
    bodyArray.push(body);
  }
  return bodyArray;
}

/**
 * The function checks if a given text is in JSON format.
 * @param {string} text - The `text` parameter is a string that represents the text that needs to be
 * checked for JSON format.
 * @returns a boolean value. It returns true if the input text is in JSON format (i.e., it starts and
 * ends with curly braces), and false otherwise.
 */
function isTextJSONFormat(text: string) {
  const jsonRegex = /^(?:\{.*\}|\[.*\])$/;
  return jsonRegex.test(text);
}

export {
  parseLocator,
  replaceKey,
  parseValue,
  parseDataTable,
  replaceStringObjects,
  parseDataTableWithKeys,
  parseDataTableWithDates,
  isTextJSONFormat,
};
