import * as config from '@root/config.json';
import { LaunchOptions } from './launchOptions';

type config = {
  loggerLevel: string;
  env: string;
  selenium: seleniumConfig;
};

type env = {
  name: string;
  url: string;
  token: string;
  users: object[];
};

type seleniumConfig = {
  launchOptions: LaunchOptions;
};

const configuration: config = config;
const loggerLevel = configuration.loggerLevel;

export { configuration, seleniumConfig, env, config ,loggerLevel };
