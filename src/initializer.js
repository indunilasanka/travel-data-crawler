import logger from './util/logger';
import DbManager from './resources/dbManager';
import { modelInitializer } from './models/index';

export default async function initializer() {
    try {
      logger.info('Initialization....');

      // Initiates the DBManager with connection pools
      DbManager.init();

      const sequelize = DbManager.getConnectionPool();
      await sequelize.authenticate();
      logger.info('Connection has been established successfully.');

      // // initialize sequelize models
      await modelInitializer();

      logger.info('Initialization Completed');
    } catch (error) {
      console.log(error)
      logger.error(error);
    }
}
