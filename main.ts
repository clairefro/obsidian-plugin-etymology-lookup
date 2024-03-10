import { App, Modal, Plugin } from "obsidian";
import { Etymo } from "./lib/etymo-js";
import { displayEntries } from "./util/displayEntries";

/** TYPES */
interface Entry {
	term: string;
	def: string;
	path: string;
	id: string;
}

/** / TYPES */
const etymo = new Etymo();

class EtymologyLookupModal extends Modal {
	data: any;

	constructor(app: App, data: any) {
		super(app);
		this.data = data;
	}

	async onOpen() {
		const { contentEl } = this;
		contentEl.setText("Searching...");
		contentEl.className = "etymol-modal-content";

		// scenario: word selected
		if (this.data) {
			try {
				const entries = await etymo.search(this.data);
				displayEntries(entries, contentEl);
			} catch (_e) {
				contentEl.setText(
					"Search failed. Are you connected to the internet?"
				);
			}
		}
		// scenario: no word selected
		else {
			contentEl.setText(
				"Highlight a word in your notes to search it's etymology!"
			);
		}
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}

export default class EtymologyLookupPlugin extends Plugin {
	async onload() {
		console.log("loading Etymology Lookup plugin");

		// Creates an icon in the left ribbon.
		this.addRibbonIcon(
			"sprout",
			"Etymology Lookup",
			(event: MouseEvent) => {
				if (!window) return;
				const selection = window.getSelection()?.toString();
				this.lookup(selection);
			}
		);

		// Adds a command to command palette
		this.addCommand({
			id: "search",
			name: "Search",
			callback: () => {
				const selected = getCurrentSelectedText();
				console.log(selected);
				this.lookup(selected);
			},
		});
	}

	onunload() {}

	// Looks up the currently selected text
	async lookup(selection: string | undefined) {
		const modal = new EtymologyLookupModal(this.app, selection);
		modal.open();
	}
}

function getCurrentSelectedText() {
	const activeLeaf = this.app.workspace.activeLeaf;

	if (activeLeaf) {
		const editor = activeLeaf.view.sourceMode.cmEditor;

		if (editor && editor.somethingSelected()) {
			const selectedText = editor.getSelection();
			return selectedText;
		}
	}

	return null;
}
