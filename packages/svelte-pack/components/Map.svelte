<section bind:this="{map}" class="{className}" data-observerhandler="map"></section>

<script>
import { onMount } from "svelte";
import { maputil, store } from "@matb85/base-pack";
let map;

export let className = null,
  apikey = "",
  callback = m => console.log(m);

onMount(() => {
  store.mutations.addhandler(window.sveltepack, {
    name: "map",
    handler: () => maputil(apikey, callback, map),
  });
  window.sveltepack.observer.observe(map);
});
</script>
