import * as environments from '@root/env.json';
import { LaunchOptions } from '@core/domain/utils/launchOptions';
import {configuration, seleniumConfig, env } from '@core/domain/utils/readConfig';
import { logger } from './logger.Manager';
// import mysql from 'mysql2/promise';

const validEnvironments = ['test', 'dev', 'uat', 'demo', 'meta'];

let environment: env;

if (validEnvironments.includes(configuration.env)) {
  environment = environments[configuration.env];
} else {
  logger.warn(`Warning: Invalid environment: ${configuration.env}`);
  environment = {
    name: 'default',
    url: 'https://example.com',
    token: 'https://example.com',
    users: [],
  };
}

const url: string = environment.url;
// const authUrl: string = environment.authUrl;
// const realm: string = environment.realm;
const users: object[] = environment.users;
const selenium: seleniumConfig = configuration.selenium;
const launchOptions: LaunchOptions = selenium.launchOptions;
// const mySqlOptions: mysql.ConnectionOptions = {
//   host: environment.mySqlHost, 
//   user: environment.mySqlUser,
//   port: 3306,
//   password: environment.mySqlPass,
//   database: environment.dataBaseName
// };

export { configuration, environment, url, users, launchOptions,};
