<section bind:this="{map}" class="{className}" aria-label="Mapa Google" data-observerhandler="map"></section>

<script lang="ts">
  import { onMount } from "svelte";
  import { type MapCallback, mapUtil, mutations } from "@matb85/base-pack";

  let map = $state<HTMLElement>()!;

  interface Props {
    className?: any;
    apikey?: string;
    callback?: MapCallback;
  }

  let { className = null, apikey = "", callback = m => console.log(m) }: Props = $props();

  onMount(() => {
    mutations.addHandler(window.sveltepack, {
      name: "map",
      handler: () => mapUtil(apikey, callback, map),
    });
    window.sveltepack.observer.observe(map);
  });
</script>
