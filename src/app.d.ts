// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	type AccountTable = {
		id: number;
		name: string | null;
		typeId: number;
		category: string | null;
		seq: number | null;
	};
}

export {};
