<div class="MP-viewer" role="button" tabindex="-1" title="Podgląd zdjęcia - kliknij by zamknąć">
  <button title="Zamknij podgląd" id="close-viewer"></button>
  <img bind:this="{img}" class="viewed-photo" alt="Powiększone zdjęcie" />
</div>

<script lang="ts">
  import { type GlobalConfigI, mixin } from "@matb85/base-pack";
  import { getContext, onMount } from "svelte";

  let img = $state<HTMLImageElement>()!;

  const GlobalConfig: GlobalConfigI = getContext("svelte-pack-sizes");

  onMount(() => {
    window.addEventListener("enlargePhoto", event => mixin.mounted((event as CustomEvent).detail, img.parentElement!, img, GlobalConfig));

    window.addEventListener("keyup", e => {
      if (e.key === "Escape") mixin.close(img.parentElement!, img);
    });

    img.parentElement!.addEventListener("click", () => mixin.close(img.parentElement!, img));
  });
</script>
