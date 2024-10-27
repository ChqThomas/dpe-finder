<script lang="ts">
	import { LeafletMap, Marker, TileLayer, Popup, Icon, Tooltip } from 'svelte-leafletjs';
	import { type MapOptions } from 'leaflet';
	import L from 'leaflet';
	import 'leaflet/dist/leaflet.css';
	import type { Result } from '$lib';
	import DpeCard from '$lib/components/dpe/DpeCard.svelte';

	const DEFAULT_TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	const DEFAULT_TILE_LAYER_OPTIONS = {
		minZoom: 0,
		maxZoom: 20,
		maxNativeZoom: 19,
		attribution: '© OpenStreetMap contributors'
	};

	let leafletMap: LeafletMap;
	let map: L.Map | undefined = $derived.by(() => leafletMap?.getMap());
	let mapMarkersComponents: Record<string, Marker> = $state({});
	let mapMarkers = $derived.by(() => {
		let m = new Map();
		for (const [key, value] of Object.entries(mapMarkersComponents)) {
			if (value) {
				m.set(key, value.getMarker());
			}
		}
		return m;
	});
	let hightlightedMarkerEl = $derived.by(() => mapMarkers.get(hightlightedMarker?.['N°DPE']));

	const mapOptions: MapOptions = {
		center: [47.0245459, 3.0122007],
		zoom: 7
	};

	interface Props {
		markers: { result: Result; latLng: [number, number] }[];
		hightlightedMarker?: Result;
	}

	let { markers = [], hightlightedMarker }: Props = $props();

	$effect(() => {
		if (map && markers.length > 0) {
			const bounds = markers.reduce((bounds, marker) => {
				return bounds.extend(marker.latLng);
			}, new L.LatLngBounds());
			map.fitBounds(bounds);
		}
	});

	$effect(() => {
		mapMarkers.forEach((marker) => {
			marker.closeTooltip();
		});
		hightlightedMarkerEl?.openTooltip();
	});

	export const resetMarkers = () => {
		mapMarkersComponents = {};
	};
</script>

<div style="height: 800px; width: 100%">
	<LeafletMap options={mapOptions} bind:this={leafletMap}>
		<TileLayer url={DEFAULT_TILE_URL} options={DEFAULT_TILE_LAYER_OPTIONS} />
		{#each markers as marker}
			{#if marker.latLng}
				<Marker
					latLng={marker.latLng}
					zIndexOffset={hightlightedMarker?.['N°DPE'] === marker.result['N°DPE'] ? 1000 : 0}
					bind:this={mapMarkersComponents[marker.result['N°DPE']]}
				>
					{#if marker.result['N°DPE'] === hightlightedMarker?.['N°DPE']}
						<Icon
							iconUrl="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png"
						/>
					{:else}
						<Icon
							iconUrl="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png"
						/>
					{/if}
					<Tooltip options={{ direction: 'bottom' }}
						>{marker.result.Adresse_brute}
						{marker.result['Code_postal_(BAN)']}
						{marker.result['Nom__commune_(BAN)']}</Tooltip
					>
					<Popup>
						<DpeCard dpe={marker.result} />
						<a
							target="_blank"
							href="https://www.google.com/maps/search/?api=1&query={marker.latLng[0]},{marker
								.latLng[1]}">Ouvrir dans Google Maps</a
						>
					</Popup>
				</Marker>
			{/if}
		{/each}
	</LeafletMap>
</div>
