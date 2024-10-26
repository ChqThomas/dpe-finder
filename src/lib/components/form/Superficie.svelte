<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import type { Parameters } from '$lib/api/parameters.svelte.js';

	let { parameters }: { parameters: Parameters } = $props();
</script>

<div class="form-group">
	<Label for="superficie" class="block mb-2">Superficie (m²)</Label>
	<Input type="number" id="superficie" bind:value={parameters.superficie} placeholder="Ex: 75" />
</div>
