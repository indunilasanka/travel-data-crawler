import logger from '../util/logger';
import locationService from "./locationService";
import keywordService from "./keywordService";
import cheerio from 'cheerio';
import {getUrlContent} from "../handler/webScrapHandler.js";
import {appendFile} from "../handler/fileHandler";
import {MATCHING_URLS_LIMIT_PER_ITERATION} from "../util/constant";
import {fileConfigs} from '../config/configs';

class CrawlerService {
    regex = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);

    async crawlTravelData(urls) {
        const matchingUrls = new Set();
        const locations = await locationService.getAllLocations();
        const keyWords = await keywordService.getAllKeywordHashes(fileConfigs.keyInputFileName);

        for (const url of urls) {
            await this.crawlGivenWebPage(url, locations, keyWords, matchingUrls);
            if (matchingUrls.length >= MATCHING_URLS_LIMIT_PER_ITERATION) {
                logger.info("matching urls limit reached. terminating");
                break;
            }
        }
    }

    async crawlGivenWebPage(url, locations, keywords, matchingUrls) {
        if (matchingUrls.length >= MATCHING_URLS_LIMIT_PER_ITERATION || matchingUrls.has(url)) {
            return;
        }

        const htmlData = await getUrlContent(url);
        const $ = await cheerio.load(htmlData.data);
        let outputData = {url: null, keywords: new Set(), locations: new Set()};

        $("body").each((i, elem) => {
            if ($(elem).find("h1") || $(elem).find("p")) {
                let webWordsArray = $(elem).text().split(/[ ,]+/);
                for (let i = 0; i < webWordsArray.length - 1; i++) {
                    //words from the web page to compare with location list and keywords list.
                    let word1 = webWordsArray[i].toLowerCase(); // single word
                    let word2 = webWordsArray[i].toLowerCase() + ' ' + webWordsArray[i + 1].toLowerCase(); // 2 words concat together

                    if (locations.has(word1) && !outputData.locations.has(word1)) {
                        outputData.locations.add(word1);
                    }
                    if (locations.has(word2) && !outputData.locations.has(word2)) {
                        outputData.locations.add(word2);
                    }

                    if (keywords.has(word1) && !outputData.keywords.has(word1)) {
                        outputData.keywords.add(word1);
                    }
                    if (keywords.has(word2) && !outputData.keywords.has(word2)) {
                        outputData.keywords.add(word2);
                    }
                }
            } else if ($(elem).find("a") && $(elem).attr('href').match(this.regex)) {
                logger.info("sublink found. start crawling for sublink");
                this.crawlGivenWebPage($(elem).attr('href'), locations, keywords, matchingUrls)
            }
        });

        if (outputData.keywords !== '' && outputData.locations !== '') {
            outputData.url = url;
            matchingUrls.add(url);
            await this.logOutput(outputData);
        }
    }

    async logOutput(data) {
        const outputString = "=================\nURL: " + data.url
            + "\nKeywords found:" + [...data.keywords.values()].join(",")
            + "\nLocations mentioned:" + [...data.locations.values()].join(",") + "\n";

        await appendFile(fileConfigs.outputFileName, outputString);
    }
}

export default new CrawlerService();
