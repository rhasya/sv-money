<script lang="ts">
	import Header from './Header.svelte';
	let { children } = $props();
</script>

<svelte:head>
	<title>SV-Money</title>
</svelte:head>

<div class="flex min-h-screen w-full flex-col">
	<Header />
	<main class="flex grow flex-col px-8 py-6">
		{@render children()}
	</main>
</div>
