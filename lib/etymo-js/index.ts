import { getEntriesFromSearch } from "./lib/cheerioOps";
import { getHtml } from "./lib/get";
import { BASE_URL } from "./constants";

class Etymo {
	async search(term: string): Promise<Entry[]> {
		const url = this._buildSearchUrl(term);
		const html = await getHtml(url);

		const entries = getEntriesFromSearch(html);

		return entries;
	}

	_buildSearchUrl(term: string): string {
		const baseUrl = `${BASE_URL}/search`;

		const urlEncodedTerm = encodeURIComponent(term);

		const url = `${baseUrl}?q=${urlEncodedTerm}`;

		return url;
	}
}

export { Etymo };
