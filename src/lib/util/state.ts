import { writable, get, derived } from 'svelte/store';
import { toBase64, fromBase64 } from 'js-base64';
import { persist, localStorage } from '@macfja/svelte-persistent-store';

const defaultState: State = {
	code: `graph TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[fa:fa-car Car]
  `,
	mermaid: JSON.stringify(
		{
			theme: 'default'
		},
		null,
		2
	),
	updateEditor: false,
	autoSync: true,
	updateDiagram: true
};

export const codeStore = persist(writable(defaultState), localStorage(), 'codeStore');
export const base64State = derived([codeStore], ([code], set) => {
	set(toBase64(JSON.stringify(code), true));
});

export const loadState = (data: string): void => {
	let state: State;
	try {
		const stateStr = fromBase64(data);
		console.log(`Tring to load state: ${stateStr}`);
		state = JSON.parse(stateStr);
	} catch (e) {
		if (data) {
			console.error('Init error', e);
		}
		state = get(codeStore);
		console.log(state);
	}
	updateCodeStore({ ...state, updateEditor: true });
};

export const updateCodeStore = (newState: State): void => {
	codeStore.update((state) => {
		return { ...state, ...newState };
	});
};

let prompted = false;
export const updateCode = (code: string, updateEditor: boolean, updateDiagram = false): void => {
	const lines = (code.match(/\n/g) || '').length + 1;

	if (lines > 50 && !prompted && get(codeStore).autoSync) {
		const turnOff = confirm(
			'Long diagram deteced. Turn off Auto Sync? Click the sync logo to manually sync.'
		);
		prompted = true;
		if (turnOff) {
			updateCodeStore({
				autoSync: false
			} as State);
		}
	}

	codeStore.update((state) => {
		return { ...state, code, updateEditor, updateDiagram };
	});
};

export const updateConfig = (config: string, updateEditor: boolean): void => {
	codeStore.update((state) => {
		return { ...state, mermaid: config, updateEditor };
	});
};

export const initURLSubscription = (): void => {
	base64State.subscribe((state: string) => {
		window.location.hash = state;
	});
};

export const getStateString = (): string => {
	return JSON.stringify(get(codeStore));
};
