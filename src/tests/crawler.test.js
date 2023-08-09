// Import the functions to test
const {getEntries} = require('../crawler');

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




