const axios = require("axios");
const cheerio = require("cheerio");

const url = 'https://news.ycombinator.com/';

async function getEntries() {
    const axiosResponse = await axios.get(url);
    const data = cheerio.load(axiosResponse.data);

    const entries = [];
    const numberOfOrderSelector = ".rank";
    const titleSelector = ".titleline > a:nth-child(1)";
    const pointsSelector = ".score";
    const numberOfCommentsSelector = ".subline > a:nth-child(6)";
    const subLineSelector = ".subline"

    data(subLineSelector).each((index, element) => {
        const numberOfOrder = data(numberOfOrderSelector).eq(index);
        const titleElement = data(titleSelector).eq(index);
        const pointsElement = data(element).find(pointsSelector);
        const commentsElement = data(element).find(numberOfCommentsSelector);

        let points = 0;
        let numberOfComments = 0;

        if (pointsElement.text() !== null) {
            points = parseInt(pointsElement.text().match(/\d+/)[0]);
        }

        if (commentsElement.text() !== "discuss") {
            numberOfComments = parseInt(commentsElement.text().match(/\d+/)[0]);
        }

        const entry = {
            numberOfOrder: numberOfOrder.text(),
            title: titleElement.text(),
            points: points,
            numberOfComments: numberOfComments,
        };

        entries.push(entry)
    });

    return entries;
}

module.exports = {getEntries};