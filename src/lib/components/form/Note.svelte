<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import { Label } from '$lib/components/ui/label/index.js';
	import type { Parameters } from '$lib/api/parameters.svelte.js';
	import DpeCircle from '$lib/components/dpe/DpeCircle.svelte';
	import type { Note } from '$lib';

	let { parameters }: { parameters: Parameters } = $props();

	const notes: Note[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

	const noteLadder: Record<Note, string> = {
		A: '<= 70',
		B: '71 à 110',
		C: '111 à 180',
		D: '181 à 250',
		E: '251 à 330',
		F: '331 à 420',
		G: '>= 421'
	};

	const emptyLabel = 'Aucune note sélectionnée';
</script>

<div class="form-group">
	<Label for="note" class="block mb-2">Note énergétique</Label>
	<Select.Root type="single" name="note" bind:value={parameters.note}>
		<Select.Trigger>
			{#if parameters.note}
				{@render noteSnippet(parameters.note)}
			{:else}
				{emptyLabel}
			{/if}
		</Select.Trigger>
		<Select.Content class="z-[9999]">
			<Select.Item value={''} label={emptyLabel} />
			{#each notes as noteOption}
				<Select.Item value={noteOption} label={noteOption}>
					{@render noteSnippet(noteOption)}
				</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>
</div>

{#snippet noteSnippet(note: Note)}
	<div>
		<DpeCircle {note} />
		<span class="ml-2">{noteLadder[note]}</span>
	</div>
{/snippet}
