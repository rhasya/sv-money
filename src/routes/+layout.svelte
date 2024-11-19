<script lang="ts">
	import '../app.css';
	import { afterNavigate } from '$app/navigation';
	let { children } = $props();
</script>

<svelte:head>
	<title>SV-Money</title>
</svelte:head>

{@render children()}
