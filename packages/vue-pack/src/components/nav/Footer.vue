<template>
  <footer class="footer">
    <div class="footer-bg">
      <Photo dontenlargeonclick :src="background" :sizes="[720, 1290, 1920, 2400]" class="w-full h-96 no-hover" />
      <div class="footer-text">
        <slot />
      </div>
    </div>
    <div class="footer-links">
      <div v-for="reference in references" :key="reference.id" class="footer-links-col">
        <h3>{{ reference.name }}</h3>
        <ul v-for="link in reference.links" :key="link.id">
          <li>
            <a :href="link.url">{{ link.name }}</a>
          </li>
        </ul>
      </div>
    </div>
    <slot name="above-copyright" />
    <div class="footer-copyright">Copyright © {{ name }} {{ new Date().getFullYear() }}</div>
  </footer>
</template>

<script>
import Photo from "../Photo.vue";
export default {
  name: "Footer",
  components: { Photo },
  props: {
    name: String,
    background: String,
    references: Array,
  },
};
</script>
