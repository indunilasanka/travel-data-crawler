import fs from "fs";

export const readFile = async (fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf8', function (error, data) {
            if (error) return reject(error);
            resolve(data);
        })
    });
}

export const appendFile = async (fileName, data) => {
    return new Promise((resolve, reject) => {
        fs.appendFile(fileName, data, function (error) {
            if (error) return reject(error);
            resolve();
        })
    });
}
