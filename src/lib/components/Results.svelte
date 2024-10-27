<script lang="ts">
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import * as Pagination from '$lib/components/ui/pagination';

	let { selectedPage = $bindable(), count = 20 }: { selectedPage: number; count: number } =
		$props();

	const perPage = 9;
	const siblingCount = 1;
</script>

<Pagination.Root {count} {perPage} {siblingCount} bind:page={selectedPage}>
	{#snippet children({ pages, currentPage })}
		<Pagination.Content>
			<Pagination.Item>
				<Pagination.PrevButton onclick={() => selectedPage--}>
					<ChevronLeft class="size-4" />
					<span class="hidden sm:block">Précédent</span>
				</Pagination.PrevButton>
			</Pagination.Item>
			{#each pages as page (page.key)}
				{#if page.type === 'ellipsis'}
					<Pagination.Item>
						<Pagination.Ellipsis />
					</Pagination.Item>
				{:else}
					<Pagination.Item>
						<Pagination.Link {page} isActive={currentPage === page.value}>
							{page.value}
						</Pagination.Link>
					</Pagination.Item>
				{/if}
			{/each}
			<Pagination.Item>
				<Pagination.NextButton onclick={() => selectedPage++}>
					<span class="hidden sm:block">Suivant</span>
					<ChevronRight class="size-4" />
				</Pagination.NextButton>
			</Pagination.Item>
		</Pagination.Content>
	{/snippet}
</Pagination.Root>
