import * as cheerio from "cheerio";
import { getIdFromPath } from "./util";
import { Entry } from "types";

function getEntriesFromSearch(html: string): Entry[] {
	const $ = cheerio.load(html);
	const entries: any[] = [];

	const entriesNodes = $('[class^="word--"]');

	entriesNodes.each((_i, el) => {
		const term = $(el).find('[class^="word__name--"]').text();
		const def = $(el).find('[class^="word__defination--"]').text();

		const path = $(el).find("a")[0].attribs.href;

		const id = getIdFromPath(path);
		const entry = { term, def, path, id } as unknown as Entry;
		entries.push(entry);
	});

	return entries;
}

export { getEntriesFromSearch };
