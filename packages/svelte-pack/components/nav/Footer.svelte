<template>
  <footer class="footer {className}">
    <div class="footer-bg">
      <Photo prevent="{['enlargeonclick']}" src="{background}" sizes="{[720, 1290, 1920, 2400]}" className="no-hover" />
      <div class="footer-text">
        <slot />
      </div>
    </div>
    <div class="footer-links">
      {#each references as reference}
        <div v-for="reference in references" :key="reference.id" class="footer-links-col">
          <h3>{reference.name}</h3>
          {#each reference.links as link}
            <ul>
              <li>
                <a href="{link.url}">{link.name}</a>
              </li>
            </ul>
          {/each}
        </div>
      {/each}
    </div>
    <div class="footer-copyright">Copyright © {name} {new Date().getFullYear()}</div>
  </footer>
</template>

<script>
import Photo from "../Photo.svelte";
export let className;
export let name;
export let background;
export let references;
</script>
