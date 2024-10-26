<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import type { Parameters } from '$lib/api/parameters.svelte.js';

	let { parameters }: { parameters: Parameters } = $props();
</script>

<div class="form-group">
	<Label for="codePostal" class="block mb-2">Code Postal</Label>
	<Input type="text" id="codePostal" bind:value={parameters.codePostal} placeholder="Ex: 75001" />
</div>
