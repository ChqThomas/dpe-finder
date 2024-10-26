<script lang="ts">
	import type { ApiResponse, Note, Result } from '$lib';
	import { Parameters } from '$lib/api/parameters.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select';
	import DpeCircle from '$lib/components/dpe/DpeCircle.svelte';
	import DpeCard from '$lib/components/dpe/DpeCard.svelte';

	let parameters = new Parameters();

	let results: Result[] = $state([]);
	let loading = $state(false);
	let error = $state(null);

	const notes: Note[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

	async function searchDPE() {
		loading = true;
		error = null;

		try {
			const response = await fetch(
				`https://data.ademe.fr/data-fair/api/v1/datasets/dpe-v2-logements-existants/lines?${parameters.getQueryParams()}`
			);

			if (!response.ok) {
				throw new Error('Erreur lors de la récupération des données');
			}

			const data = (await response.json()) as ApiResponse;
			results = data.results;
		} catch (e) {
			error = e.message;
		} finally {
			loading = false;
		}
	}
</script>

<main class="container mx-auto p-4">
	<h1 class="text-2xl font-bold mb-6">Recherche de DPE</h1>

	<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
		<div class="form-group">
			<Label for="search">Recherche</Label>
			<Input
				type="text"
				id="search"
				bind:value={parameters.search}
				placeholder="Ex: 43 rue de la paix"
			/>
		</div>
		<div class="form-group">
			<Label for="codePostal" class="block mb-2">Code Postal</Label>
			<Input
				type="text"
				id="codePostal"
				bind:value={parameters.codePostal}
				placeholder="Ex: 75001"
			/>
		</div>

		<div class="form-group">
			<Label for="superficie" class="block mb-2">Superficie (m²)</Label>
			<Input
				type="number"
				id="superficie"
				bind:value={parameters.superficie}
				placeholder="Ex: 75"
			/>
		</div>

		<div class="form-group">
			<Label for="consommation" class="block mb-2">Consommation (kWh/m²/an)</Label>
			<Input
				type="number"
				id="consommation"
				bind:value={parameters.consommation}
				placeholder="145"
			/>
		</div>

		<div class="form-group">
			<Label for="note" class="block mb-2">Note énergétique</Label>

			<Select.Root
				onSelectedChange={(e) => {
					if (e?.value) {
						// @ts-expect-error Note
						parameters.note = e.value;
					}
				}}
			>
				<Select.Trigger>
					{#if parameters.note}
						<DpeCircle note={parameters.note} />
					{:else}
						<Select.Value placeholder="Note énergétique" />
					{/if}
				</Select.Trigger>
				<Select.Content>
					{#each notes as noteOption}
						<Select.Item value={noteOption} label={noteOption}>
							<DpeCircle note={noteOption} />
						</Select.Item>
					{/each}
				</Select.Content>
				<Select.Input name="favoriteFruit" />
			</Select.Root>
		</div>

		<div class="form-group">
			<Label for="construction_year" class="block mb-2">Année de construction</Label>
			<Input
				type="number"
				id="construction_year"
				bind:value={parameters.constructionYear}
				max={new Date().getFullYear()}
				placeholder="Ex: 1990"
			/>
		</div>

		<div class="form-group">
			<Label for="date_dpe" class="block mb-2">Date du DPE</Label>
			<Input
				type="date"
				id="date_dpe"
				bind:value={parameters.dateDpe}
				placeholder="Ex: 2022-01-01"
			/>
		</div>
	</div>

	<Button onclick={searchDPE} disabled={loading}>
		{loading ? 'Recherche en cours...' : 'Rechercher'}
	</Button>

	{#if error}
		<div class="mt-4 p-4 bg-red-100 text-red-700 rounded">
			{error}
		</div>
	{/if}

	{#if results.length > 0}
		<div class="mt-6">
			<h2 class="text-xl font-bold mb-4">Résultats ({results.length})</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{#each results as dpe}
					<DpeCard {dpe} />
				{/each}
			</div>
		</div>
	{:else if !loading && !error}
		<p class="mt-4 text-gray-600">Aucun résultat à afficher</p>
	{/if}
</main>

<style>
	:global(body) {
		@apply bg-gray-50;
	}
</style>
