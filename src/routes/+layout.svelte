<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<title>SV-Money</title>
</svelte:head>

{@render children()}
