import LocationDao from '../dao/locationDao'

class LocationService {

  async getAllLocations() {
    const locations = await LocationDao.getAllLocations();
    const locationHashes = new Set();

    for(const loc of locations) {
      locationHashes.add(loc.name.toLowerCase());
    }
    return locationHashes;
  }
}

export default new LocationService();
