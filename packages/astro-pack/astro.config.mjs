// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { astroPack } from "./dist/integration.js";

// https://astro.build/config
export default defineConfig({
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
			title: '@Matb85/components-pack',
			social: {
				github: 'https://github.com/Matb85/components-pack',
			},
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
