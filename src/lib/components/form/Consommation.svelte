<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import type { Parameters } from '$lib/api/parameters.svelte.js';

	let { parameters }: { parameters: Parameters } = $props();
</script>

<div class="form-group">
	<Label for="consommation" class="block mb-2">Consommation (kWh/m²/an)</Label>
	<Input
		type="number"
		id="consommation"
		bind:value={parameters.consommation}
		placeholder="145"
	/>
</div>