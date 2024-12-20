import type { ApiRequest, Note, Result } from '$lib';

export class Parameters {
	codePostal: string = $state('');
	superficie: number | undefined = $state();
	note: Note | undefined = $state();
	constructionYear: number | undefined = $state();
	consommation: number | undefined = $state();
	dateDpe = $state('');
	search = $state('');
	selected: (keyof Result)[] = [
		'N°DPE',
		'Adresse_brute',
		'Code_postal_(BAN)',
		'Nom__commune_(BAN)',
		'Surface_habitable_logement',
		'Etiquette_DPE',
		'Conso_5_usages_par_m²_é_primaire',
		'Année_construction',
		'_geopoint'
	];

	getQueryParams() {
		const params: ApiRequest = {
			size: 1000,
			q_mode: 'simple',
			select: this.selected.join(',')
		};

		if (this.search) {
			params.q = this.search;
		}

		if (this.codePostal) {
			params['Code_postal_(BAN)_eq'] = this.codePostal;
		}

		if (this.consommation) {
			params['Conso_5_usages_par_m²_é_primaire_gte'] = this.consommation;
			params['Conso_5_usages_par_m²_é_primaire_lt'] = this.consommation + 1;
		}

		if (this.superficie) {
			params['Surface_habitable_logement_gte'] = this.superficie;
			params['Surface_habitable_logement_lt'] = this.superficie + 1;
		}

		if (this.note) {
			params['Etiquette_DPE_eq'] = this.note;
		}

		if (this.constructionYear) {
			params['Année_construction_eq'] = this.constructionYear;
		}

		if (this.dateDpe) {
			params['Date_établissement_DPE_eq'] = this.dateDpe;
		}

		const query = new URLSearchParams();

		for (const [key, value] of Object.entries(params)) {
			query.append(key, value);
		}

		return query;
	}
}
