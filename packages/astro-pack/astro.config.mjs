// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { astroPack } from "./out/integration.js";

// https://astro.build/config
export default defineConfig({
	base: '/components-pack',
	integrations: [
		astroPack({
			formats: {
				thumbnail: /min_|thumbnail_/,
				2400: '',
				1920: 'fhd_',
				1290: 'hd_',
				720: 'wvga_',
				480: 'hvga_'
			},
			enlarged: [1290, 1920]
		}),
		starlight({
			title: '@matb85/components-pack',
			social: {
				github: 'https://github.com/Matb85/components-pack',
			},
			sidebar: [
				{
					label: 'Getting Started',
					autogenerate: { directory: 'start' },
				},
				{
					label: 'base-pack',
					autogenerate: { directory: 'base-pack' },
				},
				{
					label: 'astro-pack',
					autogenerate: { directory: 'astro-pack' },
				},
				{
					label: 'svelte-pack',
					autogenerate: { directory: 'svelte-pack' },
				},
				{
					label: 'vue-pack',
					autogenerate: { directory: 'vue-pack' },
				}
			],
		}),
	],
});
