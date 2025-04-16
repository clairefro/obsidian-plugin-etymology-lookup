import { getEntriesFromSearch } from "../lib/etymo-js/lib/cheerioOps";
import { BASE_URL } from "../lib/etymo-js/constants";

describe("Etymology scraper", () => {
	test("should successfully scrape etymology results for 'hello'", async () => {
		const SEARCH_TERM = "something";
		const response = await fetch(`${BASE_URL}/search?q=${SEARCH_TERM}`);
		const html = await response.text();
		const entries = await getEntriesFromSearch(html);

		console.log(`Found ${entries.length} entries for '${SEARCH_TERM}'`);
		console.log(`First entry:`);
		console.log(JSON.stringify(entries[0], null, 2));
		expect(entries.length).toBeGreaterThan(1); // "hello" returns more than one result
		expect(entries[0]).toHaveProperty("term");
		expect(entries[0]).toHaveProperty("def");
		expect(entries[0]).toHaveProperty("path");
		expect(entries[0]).toHaveProperty("id");
		expect(entries[0].term.length).toBeGreaterThan(0);
		expect(entries[0].def.length).toBeGreaterThan(0);
		expect(entries[0].path.length).toBeGreaterThan(0);
		expect(entries[0].id.length).toBeGreaterThan(0);
		expect(entries[0].term).toMatch(new RegExp(`^${SEARCH_TERM}`, "i"));
		expect(entries[0].def.length).toBeGreaterThan(0);
	}, 30000);
});
