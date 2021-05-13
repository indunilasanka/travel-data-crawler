import axios from 'axios';

export const getUrlContent = async (url) => {
    return await axios.get(url);
};
