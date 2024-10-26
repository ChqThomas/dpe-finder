<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import DpeCard from '$lib/components/dpe/DpeCard.svelte';
	import { Search, Superficie, CodePostal, Consommation, Note } from '$lib/components/form';
	import AnneeConstruction from '$lib/components/form/AnneeConstruction.svelte';
	import DateDpe from '$lib/components/form/DateDpe.svelte';
	import { ApiClient } from '$lib/api/client.svelte';

	let api = new ApiClient();
	let parameters = api.parameters;
</script>

<main class="container mx-auto p-4">
	<h1 class="text-2xl font-bold mb-6">Recherche de DPE</h1>

	<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
		<Search {parameters}/>
		<CodePostal {parameters}/>
		<Superficie {parameters}/>
		<Consommation {parameters}/>
		<Note {parameters}/>
		<AnneeConstruction {parameters}/>
		<DateDpe {parameters}/>
	</div>

	<Button onclick={() => api.searchDPE()} disabled={api.loading}>
		{api.loading ? 'Recherche en cours...' : 'Rechercher'}
	</Button>

	{#if api.error}
		<div class="mt-4 p-4 bg-red-100 text-red-700 rounded">
			{api.error}
		</div>
	{/if}

	{#if api.results.length > 0}
		<div class="mt-6">
			<h2 class="text-xl font-bold mb-4">Résultats ({api.results.length})</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{#each api.results as dpe}
					<DpeCard {dpe} />
				{/each}
			</div>
		</div>
	{:else if !api.loading && !api.error}
		<p class="mt-4 text-gray-600">Aucun résultat à afficher</p>
	{/if}
</main>

