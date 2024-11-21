<script lang="ts" generics="TData extends RowData">
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '@components/ui/table';
	import {
		createTable,
		type ColumnDefTemplate,
		type RowData,
		type TableOptions,
		type TableOptionsResolved
	} from '@tanstack/table-core';

	const options: TableOptions<TData> = $props();
	const resolvedOptions: TableOptionsResolved<TData> = {
		state: {},
		onStateChange: () => {},
		renderFallbackValue: null,
		...options
	};
	let table = $state(createTable<TData>(resolvedOptions));
	let tableState = $state(table.initialState);
	table.setOptions((prev) => ({
		...prev,
		...options,
		state: {
			...tableState,
			...options.state
		},
		onStateChange: (updater) => {
			if (updater instanceof Function) {
				tableState = updater(tableState);
			} else {
				tableState = updater;
			}
			options.onStateChange?.(updater);
		}
	}));
</script>

{#snippet flexRender(component?: unknown, props?: unknown)}
	{#if component instanceof Function}
		{#if `${component}`.startsWith('(anchor')}
			{@render component(props!)}
		{:else}
			{@render flexRender(component(props!), props)}
		{/if}
	{:else}
		{component}
	{/if}
{/snippet}

<div class="rounded-md border">
	<Table>
		<TableHeader>
			{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
				<TableRow>
					{#each headerGroup.headers as header (header.id)}
						<TableHead>
							{#if header.isPlaceholder}
								null
							{:else}
								{@render flexRender(header.column.columnDef.header, header.getContext())}
							{/if}
						</TableHead>
					{/each}
				</TableRow>
			{/each}
		</TableHeader>
		<TableBody>
			{#if table.getRowModel().rows?.length}
				{#each table.getRowModel().rows as row (row.id)}
					<TableRow data-state={row.getIsSelected() && 'selected'}>
						{#each row.getVisibleCells() as cell (cell.id)}
							<TableCell>
								{@render flexRender(cell.column.columnDef.cell, cell.getContext())}
							</TableCell>
						{/each}
					</TableRow>
				{/each}
			{:else}
				<TableRow>
					<TableCell colspan={options.columns.length} class="h-24 text-center"
						>No results.</TableCell
					>
				</TableRow>
			{/if}
		</TableBody>
	</Table>
</div>
