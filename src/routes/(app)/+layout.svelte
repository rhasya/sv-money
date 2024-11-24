<script lang="ts">
	import Header from './Header.svelte';
	let { children } = $props();
</script>

<svelte:head>
	<title>SV-Money</title>
</svelte:head>

<div class="flex max-h-screen min-h-screen w-full flex-col overflow-hidden">
	<Header />
	<main class="flex grow flex-col overflow-auto px-8 py-6">
		{@render children()}
	</main>
</div>
