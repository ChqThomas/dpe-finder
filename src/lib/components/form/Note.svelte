<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import { Label } from '$lib/components/ui/label/index.js';
	import type { Parameters } from '$lib/api/parameters.svelte.js';
	import DpeCircle from '$lib/components/dpe/DpeCircle.svelte';
	import type { Note } from '$lib';

	let { parameters }: { parameters: Parameters } = $props();

	const notes: Note[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
</script>

<div class="form-group">
	<Label for="note" class="block mb-2">Note énergétique</Label>
	<Select.Root type="single" name="note" bind:value={parameters.note}>
		<Select.Trigger>
			{#if parameters.note}
				<DpeCircle note={parameters.note} />
			{:else}
				Note énergétique
			{/if}
		</Select.Trigger>
		<Select.Content>
			{#each notes as noteOption}
				<Select.Item value={noteOption} label={noteOption}>
					<DpeCircle note={noteOption} />
				</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>
</div>
