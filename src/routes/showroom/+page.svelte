<script lang="ts">
	import Button from '@components/Button.svelte';
</script>

{#snippet title(text: string)}
	<h1 class="text-2xl font-bold">{text}</h1>
{/snippet}

<main>
	<div class="flex flex-col gap-2">
		{@render title('버튼')}
		<div>
			<Button>버튼</Button>
			<Button variant="secondary">버튼</Button>
			<Button disabled>버튼</Button>
		</div>
		{@render title('텍스트필드')}
	</div>
</main>
