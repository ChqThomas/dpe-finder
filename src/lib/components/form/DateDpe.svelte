<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import type { Parameters } from '$lib/api/parameters.svelte.js';

	let { parameters }: { parameters: Parameters } = $props();
</script>

<div class="form-group">
	<Label for="date_dpe" class="block mb-2">Date du DPE</Label>
	<Input
		type="date"
		id="date_dpe"
		bind:value={parameters.dateDpe}
		placeholder="Ex: 2022-01-01"
		min={new Date('2021-06-30').toISOString().split('T')[0]}
		max={new Date().toISOString().split('T')[0]}
	/>
</div>
