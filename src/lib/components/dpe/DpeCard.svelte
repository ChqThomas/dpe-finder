<script lang="ts">
	import DpeCircle from '$lib/components/dpe/DpeCircle.svelte';
	import type { Result } from '$lib';

	let {
		dpe,
		onmouseover,
		onmouseout
	}: { dpe: Result; onmouseover?: () => void; onmouseout?: () => void } = $props();
</script>

<div
	class="border rounded p-4"
	{onmouseover}
	{onmouseout}
	onfocus={onmouseover}
	onblur={onmouseout}
	role="contentinfo"
>
	<h3 class="font-bold mb-2">
		<a target="_blank" href="https://observatoire-dpe-audit.ademe.fr/afficher-dpe/{dpe['N°DPE']}"
			>DPE {dpe['N°DPE']}</a
		>
	</h3>
	<p>Adresse : {dpe.Adresse_brute} {dpe['Code_postal_(BAN)']}</p>
	<p>Surface habitable : {dpe.Surface_habitable_logement} m²</p>
	<p>
		Note:
		<DpeCircle note={dpe.Etiquette_DPE} />
	</p>
	<p>Consommation: {dpe['Conso_5_usages_par_m²_é_primaire']} kWh/m²/an</p>
	<p>Année construction: {dpe.Année_construction}</p>
</div>
