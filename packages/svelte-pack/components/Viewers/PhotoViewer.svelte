<section class="photo-viewer" bind:this="{el}" on:click="{close}">
  <img bind:this="{img}" class="viewed-photo" alt="enlarged content" />
</section>

<script>
import { mixin } from "@matb85/base-pack";
import { onMount } from "svelte";

let img;
let el;
const close = () => mixin.close(img);

onMount(() => mixin.mounted(img, el));
</script>
