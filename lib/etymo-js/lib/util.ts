function getIdFromPath(path: string): string {
	// TS doesn't believe me than this match will be un-null...
	// eslint-disable-next-line
	return path.match(/\d+$/)?.[0]!;
}

const NEWLINE_DELIMITER = "\n\n---\n\n";
export { getIdFromPath };
