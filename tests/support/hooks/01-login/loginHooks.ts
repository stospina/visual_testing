import { logger } from '@core/infrastructure/logger.Manager';
import { Before, After, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { browserManager } from '@core/infrastructure/browserManager';
import { launchOptions, environment } from '@core/infrastructure/configManager';

setDefaultTimeout(50000);

Before('@UI', async function () {
  await browserManager.openBrowser(launchOptions);
  logger.info('Browser successfully opened');
  await browserManager.navigateTo(environment.url);
});

After('@UI', async function (scenario) {
  if (scenario.result?.status === Status.FAILED) {
    logger.debug('Taking a screenshot of the browser');
    const screenshot: string = await browserManager.takeScreenshot();
    this.attach(Buffer.from(screenshot, 'base64'), 'image/png');
  }
  await browserManager.closeBrowser();
  logger.info('Browser closed');
});
