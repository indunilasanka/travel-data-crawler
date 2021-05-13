import {getModule} from '../models/index';

class LocationDao {

    //here I am using sequelize ORM for db quering. But for this task simple mysql2.connection.query would work
    async getAllLocations() {
        const locationModel = getModule('location');
        return locationModel.findAll({raw: true, attributes: ['name']});
    }
}

export default new LocationDao();
