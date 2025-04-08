import * as cheerio from "cheerio";
import { getIdFromPath } from "./util";
import { Entry } from "types";
import { getHtml } from "./getHtml";
import { BASE_URL } from "../constants";

async function getEntriesFromSearch(html: string): Promise<Entry[]> {
	const $ = cheerio.load(html);

	// Get all links and convert to array of promises to resolve linked terms
	const entryPromises = $('a[href^="/word/"]:not(.crossreference):not(.link)')
		.map(async (_i, el) => {
			const $el = $(el);
			const term = $el.find("span").first().text();
			const path = $el.attr("href") as string;

			// Fetch HTML for this term
			const termHtml = await getHtml(BASE_URL + path);
			const $term = cheerio.load(termHtml);

			const def = $term("section.-mt-4.-mb-2.lg\\:-mb-2 > p")
				.map((_i, el) => $term(el).text())
				.get()
				.join("\n\n")
				.trim()
				.replace(/\t/g, "");

			const id = getIdFromPath(path);
			return { term, def, path, id } as Entry;
		})
		.get(); // Convert Cheerio object to array

	const entries = await Promise.all(entryPromises);
	return entries;
}

export { getEntriesFromSearch };
