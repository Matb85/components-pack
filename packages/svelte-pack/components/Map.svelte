<section bind:this="{map}" class="{className}" aria-label="Mapa Google" data-observerhandler="map"></section>

<script>
import { onMount } from "svelte";
import { mapUtil, mutations } from "@matb85/base-pack";
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
  mutations.addHandler(window.sveltepack, {
    name: "map",
    handler: () => mapUtil(apikey, callback, map),
  });
  window.sveltepack.observer.observe(map);
});
</script>
