import { Notice } from "obsidian";
import { Entry } from "types";

function displayEntries(entries: Entry[], contentEl: HTMLElement) {
	if (!entries.length) {
		contentEl.setText("No etymology results found.");
		return;
	}

	contentEl.setText("");

	const listEl = contentEl.createEl("ul");
	listEl.className = "etymol-entries";

	// Iterate over the search results and create a list item for each entry
	entries.forEach((entry) => {
		const itemEl = listEl.createEl("li");
		itemEl.className = "etymol-entry";

		const entryTitleEl = itemEl.createEl("p");
		entryTitleEl.textContent = entry.term;
		entryTitleEl.className = "etymol-entry-title";
		itemEl.appendChild(entryTitleEl);

		const entryDefEl = itemEl.createEl("p");
		entryDefEl.textContent = entry.def;
		entryDefEl.className = "etymol-entry-def";
		itemEl.appendChild(entryDefEl);

		itemEl.addEventListener("click", function () {
			const clipboardContent = `${entry.term}::${entry.def}`;
			try {
				navigator.clipboard.writeText(clipboardContent);
				new Notice("Copied!");
			} catch (e) {
				console.error(e);
				new Notice("Failed to copy :(");
			}
		});
	});
}

export { displayEntries };
