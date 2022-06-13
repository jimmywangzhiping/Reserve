'use strict';

export function defineConfig(config: IConfig): IConfig {
  return config;
}

export interface IConfig {
  /**
   * 用户鉴权Token密钥
   */
  jwt?: JwtConfigOptions;
  /**
   *  Mongodb数据库
   */
  mongodb?: MongodbOptions;
}

export interface JwtConfigOptions {
  secret: string;
}
export interface MongodbOptions {
  connection: string;
}
