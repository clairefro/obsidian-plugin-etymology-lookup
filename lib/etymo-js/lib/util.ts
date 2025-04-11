function getIdFromPath(path: string): string {
	return path.split("/").pop() || "";
}

export { getIdFromPath };
