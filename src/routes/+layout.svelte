<script lang="ts">
	import '../app.css';
	import Header from './Header.svelte';
	let { children } = $props();
</script>

<svelte:head>
	<title>SV-Money</title>
</svelte:head>

<Header />
{@render children()}
