---
title: Svelte - Installation
description: Learn how to get started with @matb85/svelte-pack.
sidebar:
  order: 1
---

### 1. Installation

Use your favorite package manager to install the package:

```bash
$ npm i @matb85/svelte-pack
```

### 2. SvelteKit setup

Add configuration in your main layout file:

```svelte
// +layout.svelte
<script lang="ts">
	import { setContext } from 'svelte';
	import type { GlobalConfigI } from '@matb85/base-pack';

	const config: GlobalConfigI = {
		formats: {
			thumbnail: /min_|thumbnail_/,
			2400: 'qhd_',
			1920: 'fhd_',
			1290: 'hd_',
			720: 'wvga_',
			480: 'hvga_'
		},
		enlarged: [1290, 1920]
	};
	setContext('svelte-pack-sizes', config);
</script>
```

Parameters:

- `formats`: Object with the keys being the desired width and the values being the prefix to be added to the image name.
- `enlarged`: Array with the desired widths for the enlarged images.