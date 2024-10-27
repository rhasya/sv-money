export function useDialog() {
	let isOpen = $state(false);

	function open() {
		isOpen = true;
	}

	function close() {
		isOpen = false;
	}

	function onclose() {
		if (isOpen) isOpen = false;
	}

	return {
		get isOpen() {
			return isOpen;
		},
		open,
		close,
		onclose
	};
}
