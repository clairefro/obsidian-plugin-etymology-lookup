function getIdFromPath(path: string): string {
	// TS doesn't believe me than this match will be un-null...
	// eslint-disable-next-line
	return path.match(/\d+$/)?.[0]!;
}

export { getIdFromPath };
