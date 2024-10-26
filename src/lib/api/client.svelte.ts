import type { ApiResponse, Result } from '$lib';
import { Parameters } from '$lib/api/parameters.svelte';

export class ApiClient {
	parameters: Parameters;
	results: Result[] = $state([]);
	loading = $state(false);
	error = $state(null);

	constructor() {
		this.parameters = new Parameters();
	}

	async searchDPE() {
		this.loading = true;
		this.error = null;

		try {
			const response = await fetch(
				`https://data.ademe.fr/data-fair/api/v1/datasets/dpe-v2-logements-existants/lines?${this.parameters.getQueryParams()}`
			);

			if (!response.ok) {
				throw new Error('Erreur lors de la récupération des données');
			}

			const data = (await response.json()) as ApiResponse;
			this.results = data.results;
		} catch (e) {
			this.error = e.message;
		} finally {
			this.loading = false;
		}
	}

	getGeoPoints() {
		return this.results.map((result) => {
			return {
				latLng: result._geopoint.split(',').map((coord) => parseFloat(coord))
			};
		});
	}
}
