import Sequelize from 'sequelize';
import {dbConfigs} from '../config/configs';

export default class DbManager {
  static init() {
    DbManager.poolObj = new Sequelize(dbConfigs.database, dbConfigs.user, dbConfigs.password, {
      host: dbConfigs.host,
      dialect: 'mysql',
      operatorsAliases: '0',
      logging: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 60000,
        idle: 10000,
      },
    });
  }

  static getConnectionPool() {
    return DbManager.poolObj;
  }
}
