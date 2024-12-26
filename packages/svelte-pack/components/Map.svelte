<section bind:this="{map}" class="{className}" aria-label="Mapa Google" data-observerhandler="map"></section>

<script>
import { onMount } from "svelte";
import { maputil, mutations } from "@matb85/base-pack";
let map = $state();

  /**
   * @typedef {Object} Props
   * @property {any} [className]
   * @property {string} [apikey]
   * @property {any} [callback]
   */

  /** @type {Props} */
  let { className = null, apikey = "", callback = m => console.log(m) } = $props();

onMount(() => {
  mutations.addhandler(window.sveltepack, {
    name: "map",
    handler: () => maputil(apikey, callback, map),
  });
  window.sveltepack.observer.observe(map);
});
</script>
