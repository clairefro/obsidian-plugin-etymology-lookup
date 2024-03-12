function ellipsis(str: string, length: number = 10) {
	if (str.length > length) {
		return str.substring(0, length) + "...";
	} else {
		return str;
	}
}

export { ellipsis };
