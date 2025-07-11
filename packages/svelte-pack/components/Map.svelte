<section bind:this={map} class={className} aria-label="Mapa Google" data-observerhandler="map"></section>

<script lang="ts">
import { onMount } from "svelte";
import { type MapCallbackT, setUpGoogleMap } from "@matb85/base-pack";

let map = $state<HTMLElement>()!;

interface Props {
  className?: any;
  apikey?: string;
  callback?: MapCallbackT;
}

let { className = null, apikey = "", callback = m => console.log(m) }: Props = $props();

onMount(() => {
  setUpGoogleMap(apikey, callback, map, window.cpStore);
});
</script>
