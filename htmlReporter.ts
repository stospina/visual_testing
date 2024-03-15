import * as reporter from 'cucumber-html-reporter';

const options: reporter.Options = {
  theme: 'bootstrap',
  name: 'Meetpoint - Automation Team',
  jsonFile: 'Reports/report.json',
  output: 'Reports/cucumberReport.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  storeScreenshots: false,
  launchReport: true
};

reporter.generate(options);
