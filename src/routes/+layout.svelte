<script lang="ts">
	import '../app.css';
	import { afterNavigate } from '$app/navigation';
	let { children } = $props();

	afterNavigate(() => {
		console.log('RELOAD!');
		HSStaticMethods.autoInit();
	});
</script>

<svelte:head>
	<title>SV-Money</title>
</svelte:head>

{@render children()}
