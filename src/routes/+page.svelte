<script lang="ts">
	import { browser } from '$app/environment';
	import { Button } from '$lib/components/ui/button';
	import DpeCard from '$lib/components/dpe/DpeCard.svelte';
	import { Search, Superficie, CodePostal, Consommation, Note } from '$lib/components/form';
	import AnneeConstruction from '$lib/components/form/AnneeConstruction.svelte';
	import DateDpe from '$lib/components/form/DateDpe.svelte';
	import { ApiClient } from '$lib/api/client.svelte';
	import { onMount } from 'svelte';
	import type Map from '$lib/components/Map.svelte';
	import type { Result } from '$lib';
	import Results from '$lib/components/Results.svelte';

	let LeafletContainer: typeof Map | undefined = $state();
	let LeafletMap: ReturnType<typeof Map> | undefined = $state();

	onMount(async () => {
		if (browser) {
			LeafletContainer = (await import('$lib/components/Map.svelte')).default;
		}
	});

	function search() {
		if (LeafletMap) {
			LeafletMap.resetMarkers();
		}
		api.searchDPE();
	}

	let hightlightedMarker: Result | undefined = $state();

	let api = new ApiClient();
	let parameters = api.parameters;

	let perPage = 9;
	let selectedPage = $state(1);
	let paginatedResults = $derived.by(() => {
		return api.results.slice((selectedPage - 1) * perPage, selectedPage * perPage);
	});
</script>

<main class="container mx-auto p-4">
	<h1 class="text-2xl font-bold mb-6">
		Recherche de bien immobilier à partir des informations DPE
	</h1>
	<div class="mb-6 text-gray-600">
		Vous souhaitez retrouver l'adresse d'un bien immobilier présenté dans une annonce ? <br />
		Si vous connaissez
		<span class="font-bold">le code postal, la date du DPE et sa consommation en kWh/m²/an</span>,
		vous pouvez facilement localiser le bien recherché.<br />
		<span class="text-red-700"
			>Ne fonctionne que pour les DPE de effectués après le 1er juillet 2021.</span
		><br />
		Entrez les informations dont vous disposez dans le formulaire ci-dessous puis cliquez sur le bouton
		"Rechercher".
	</div>

	<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
		<Search {parameters} />
		<CodePostal {parameters} />
		<Superficie {parameters} />
		<Consommation {parameters} />
		<Note {parameters} />
		<AnneeConstruction {parameters} />
		<DateDpe {parameters} />
	</div>

	<Button onclick={search} disabled={api.loading}>
		{api.loading ? 'Recherche en cours...' : 'Rechercher'}
	</Button>

	{#if api.error}
		<div class="mt-4 p-4 bg-red-100 text-red-700 rounded">
			{api.error}
		</div>
	{/if}

	<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
		{#if paginatedResults.length > 0}
			<div class="mt-6">
				<h2 class="text-xl font-bold mb-4">Résultats ({api.results.length})</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{#each paginatedResults as dpe}
						<DpeCard
							{dpe}
							onmouseover={() => (hightlightedMarker = dpe)}
							onmouseout={() => (hightlightedMarker = undefined)}
						/>
					{/each}
				</div>
				<Results bind:selectedPage count={api.results.length}></Results>
			</div>
		{:else if !api.loading && !api.error}
			<div class="mt-6">
				<p class="mt-4 text-gray-600">Aucun résultat à afficher</p>
			</div>
		{:else if api.loading}
			<div class="mt-6">Chargement des données...</div>
		{/if}

		{#if browser}
			<div class="mt-6">
				<h2 class="text-xl font-bold mb-4">Carte</h2>
				<LeafletContainer
					bind:this={LeafletMap}
					markers={api.getGeoPoints()}
					{hightlightedMarker}
				/>
			</div>
		{/if}
	</div>
</main>
