const axios = require("axios");
const cheerio = require("cheerio");

const url = 'https://news.ycombinator.com/';

async function getEntries() {
    const axiosResponse = await axios.get(url);
    const data = cheerio.load(axiosResponse.data);

    const entries = [];

    //Selectors to get data
    const numberOfOrderSelector = ".rank";
    const titleSelector = ".titleline > a:nth-child(1)";
    const pointsSelector = ".score";
    const numberOfCommentsSelector = ".subline > a:nth-child(6)";
    const subLineSelector = ".subline"

    // Loop to insert entries' properties
    data(subLineSelector).each((index, element) => {
        const numberOfOrder = data(numberOfOrderSelector).eq(index);
        const titleElement = data(titleSelector).eq(index);
        const pointsElement = data(element).find(pointsSelector);
        const commentsElement = data(element).find(numberOfCommentsSelector);

        let entryPoints = 0;
        let numberOfComments = 0;

        // Casting to number the entryPoints', and numberOfComments' strings
        if (pointsElement.text() !== null) {
            entryPoints = parseInt(pointsElement.text().match(/\d+/)[0]);
        }
        if (commentsElement.text() !== "discuss") {
            numberOfComments = parseInt(commentsElement.text().match(/\d+/)[0]);
        }

        const entry = {
            numberOfOrder: numberOfOrder.text(),
            title: titleElement.text(),
            entryPoints: entryPoints,
            numberOfComments: numberOfComments,
        };

        entries.push(entry)
    });

    return entries;
}

// Function which filters the entries relative to five words (entries > 5 || entries <= 5)
function filterEntries(entries) {
    const moreThanFive = entries.filter(entry => entry.title.split(" ").length > 5);
    const lessThanOrEqualThanFive = entries.filter(entry => entry.title.split(" ").length <= 5);

    return [moreThanFive, lessThanOrEqualThanFive];
}

function orderByComments(entries) {
    entries.sort(
        (a, b) => b.numberOfComments - a.numberOfComments
    )

    return entries;
}

function orderByPoints(entries) {
    entries.sort(
        (a, b) => b.entryPoints - a.entryPoints
    )

    return entries;
}


module.exports = {getEntries, filterEntries, orderByComments, orderByPoints};