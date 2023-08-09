// Import the functions to test
const {getEntries, filterEntries} = require('../crawler');

describe("Returns correctly the entries", () => {
    test("The function must return the entries", async () => {
        const entries = await getEntries();
        expect(Array.isArray(entries)).toBe(true);
    });

    it("returns the entries with all its properties", async () => {
        const entries = await getEntries();
        expect(Array.isArray(entries)).toBe(true);

        entries.forEach(entry => {
            expect(entry).toHaveProperty('numberOfOrder');
            expect(entry).toHaveProperty('title');
            expect(entry).toHaveProperty('points');
            expect(entry).toHaveProperty('numberOfComments');
        });
    });

    it('returns the properties with adequate types', async () => {
        const entries = await getEntries();
        expect(Array.isArray(entries)).toBe(true);

        entries.forEach(entry => {
            expect(typeof entry.numberOfOrder).toBe('string');
            expect(typeof entry.title).toBe('string');
            expect(typeof entry.points).toBe('number');
            expect(typeof entry.numberOfComments).toBe('number');
        });
    });
});

describe("Filter", () => {
    it("Filters the entries with more than five words in the title", async () => {
        const entries = await getEntries();
        const [filteredEntries, _] = filterEntries(entries)

        filteredEntries.forEach(entry =>{
           const titleWords = entry.title.split(" ");
           expect(titleWords.length).toBeGreaterThan(5);
        });
    });

    it('Filters the entries with less than or equal to five words in the title', async () => {
        const entries = await getEntries();
        const [_, filteredEntries] = filterEntries(entries)

        filteredEntries.forEach(entry => {
            const titleWords = entry.title.split(" ");
            expect(titleWords.length).toBeLessThanOrEqual(5);
        });
    });
});
