<script lang="ts">
	import { createRawSnippet } from 'svelte';
	import { getCoreRowModel, type ColumnDef } from '@tanstack/table-core';

	import { Button } from '@components/ui/button';
	import { DataGrid } from '@components/ui/datagrid';

	// data
	type Payment = {
		id: string;
		amount: number;
		status: 'pending' | 'processing' | 'success' | 'failed';
		email: string;
	};

	let payments: Payment[] = $state([
		{
			id: '728ed52f',
			amount: 100,
			status: 'pending',
			email: 'm@example.com'
		},
		{
			id: '489e1d42',
			amount: 125,
			status: 'processing',
			email: 'example@gmail.com'
		}
	]);

	const columns: ColumnDef<Payment>[] = [
		{
			accessorKey: 'status',
			header: 'Status'
		},
		{
			accessorKey: 'email',
			header: 'Email'
		},
		{
			accessorKey: 'amount',
			header: createRawSnippet(() => ({
				render: () => '<span>Amount</span>'
			})),
			cell: ({ row }) => {
				const amount = parseFloat(row.getValue('amount'));
				const formatted = new Intl.NumberFormat('ko-KR', {
					style: 'currency',
					currency: 'KRW'
				}).format(amount);

				return createRawSnippet(() => ({
					render: () => `<div class="text-right font-medium">${formatted}</div>`
				}));
			}
		}
	];

	function handleAddClick() {
		payments.push({
			id: crypto.randomUUID(),
			status: 'pending',
			amount: 19281,
			email: 'x@test.com'
		});
	}
</script>

<main class="container mx-auto">
	<h1>DataGrid</h1>
	<Button onclick={handleAddClick}>ADD</Button>
	<DataGrid {columns} data={payments} getCoreRowModel={getCoreRowModel()}></DataGrid>
</main>
