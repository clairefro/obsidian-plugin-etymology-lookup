module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	moduleNameMapper: {
		"^types$": "<rootDir>/types.ts",
		"^obsidian$": "<rootDir>/__mocks__/obsidian.ts",
	},
};
