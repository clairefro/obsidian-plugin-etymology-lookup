export interface RequestUrlResponse {
	status: number;
	text: string;
}
/** Overrides obsdiian's requestUrl and uses native fetch, to enable isolated testing in GH actions */
export const requestUrl = async ({
	url,
	headers,
}: {
	url: string;
	headers?: Record<string, string>;
}): Promise<RequestUrlResponse> => {
	const response = await fetch(url, { headers });
	return {
		status: response.status,
		text: await response.text(),
	};
};
