import { RequestUrlResponse, requestUrl } from "obsidian";

async function getHtml(url: string): Promise<string> {
	const headers = { "Content-Type": "text/html" };

	const res: RequestUrlResponse = await requestUrl({ url, headers });

	return res.text as string;
}

export { getHtml };
