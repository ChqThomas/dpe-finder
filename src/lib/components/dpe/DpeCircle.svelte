<script lang="ts">
	let { note }: { note: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' } = $props();
</script>

<span
	class="h-[20px] w-[20px] rounded-full text-white inline-flex items-center justify-center"
	style="background-color: var(--dpe-{note.toLocaleLowerCase()}-color)"
>
	{note}
</span>
