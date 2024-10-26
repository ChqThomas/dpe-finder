<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import type { Parameters } from '$lib/api/parameters.svelte.js';

	let { parameters }: { parameters: Parameters } = $props();
</script>

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
