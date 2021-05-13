import {readFile} from "../handler/fileHandler";

class KeywordService {

    async getAllKeywordHashes(fileName) {
        const fileData = await readFile(fileName);
        const keywords = fileData.split("\n");
        const keyWordHashes = new Set();

        for(const key of keywords) {
            keyWordHashes.add(key.toLocaleLowerCase())
        }
        return keyWordHashes;
    }
}

export default new KeywordService();
