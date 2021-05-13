import crawlerService from './services/crawlerService';
import initializer from './initializer';

const execute = async () => {

    await initializer(); // initialize ORM and db pools

    await crawlerService.crawlTravelData(["https://www.srilanka.travel/"]);

}

execute();
