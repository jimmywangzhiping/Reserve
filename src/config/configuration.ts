'use strict';
import { merge } from 'lodash';
import DefaultConfig from './config.default';
import { IConfig } from './defineConfig';
export default () => {
  let envConfig: IConfig = {};
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    envConfig = require(`./config.${process.env.NODE_ENV}`).default;
  } catch (error) {}
  return merge(DefaultConfig, envConfig);
};
