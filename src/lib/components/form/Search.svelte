<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import type { Parameters } from '$lib/api/parameters.svelte.js';

	let { parameters }: { parameters: Parameters } = $props();
</script>

<div class="form-group">
	<Label for="search">Recherche</Label>
	<Input
		type="text"
		id="search"
		bind:value={parameters.search}
		placeholder="Ex: 43 rue de la paix"
	/>
</div>
