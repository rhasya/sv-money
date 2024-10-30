<script lang="ts">
	import Button from '@components/Button.svelte';
	import PageTitle from '@components/PageTitle.svelte';

	const { data } = $props();
</script>

<PageTitle>Transactions - 우리은행</PageTitle>
<div class="mt-4 flex gap-2">
	<Button>추가</Button>
	<Button variant="secondary">수정</Button>
	<Button variant="secondary">삭제</Button>
</div>
<table class="mt-4 w-full table-fixed border-collapse">
	<thead>
		<tr class="border-y border-primary">
			<th class="w-[96px] p-1">Date</th>
			<th>Title</th>
			<th class="w-[100px]">Account</th>
			<th class="w-[100px]">Income</th>
			<th class="w-[100px]">Outgo</th>
		</tr>
	</thead>
	<tbody>
		<tr class="border-y border-primary">
			<td class="p-1 text-center">2024-11-01</td>
			<td class="overflow-hidden text-ellipsis whitespace-nowrap" title="음">음</td>
			<td
				class="overflow-hidden text-ellipsis whitespace-nowrap"
				title="토스뱅크보다긴 문자열 입니다.">토스뱅크보다긴 문자열 입니다.</td
			>
			<td class="text-right">100,000,000</td>
			<td class="text-right">100,000,000</td>
		</tr>
	</tbody>
	<tfoot>
		<tr class="border-y border-primary bg-primary text-primary-fg">
			<th class="p-1 text-right" colspan={3}>SUM</th>
			<th class="text-right">1000</th>
			<th class="text-right">1000</th>
		</tr>
	</tfoot>
</table>
