<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import { LeafletMap, Marker, TileLayer, Popup } from 'svelte-leafletjs';
	import { type MapOptions } from 'leaflet';
	import L from 'leaflet';
	import 'leaflet/dist/leaflet.css';

	const DEFAULT_TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	const DEFAULT_TILE_LAYER_OPTIONS = {
		minZoom: 0,
		maxZoom: 20,
		maxNativeZoom: 19,
		attribution: '© OpenStreetMap contributors'
	};

	let leafletMap: LeafletMap;
	let map: L.Map | undefined = $state();

	const mapOptions: MapOptions = {
		center: [47.0245459, 3.0122007],
		zoom: 7
	};

	let { markers = [] }: { markers: ComponentProps<Marker>[] } = $props();

	$effect(() => {
		if (map && markers.length > 0) {
			const bounds = markers.reduce((bounds, marker) => {
				return bounds.extend(marker.latLng);
			}, new L.LatLngBounds());
			map.fitBounds(bounds);
		}
	});

	$effect(() => {
		map = leafletMap.getMap();
	});
</script>

<div style="height: 800px; width: 100%">
	<LeafletMap options={mapOptions} bind:this={leafletMap}>
		<TileLayer url={DEFAULT_TILE_URL} options={DEFAULT_TILE_LAYER_OPTIONS} />
		{#each markers as marker}
			<Marker latLng={marker.latLng}>
				<Popup>
					<a
						target="_blank"
						href="https://www.google.com/maps/search/?api=1&query={marker.latLng[0]},{marker
							.latLng[1]}">Ouvrir dans Google Maps</a
					>
				</Popup>
			</Marker>
		{/each}
	</LeafletMap>
</div>
