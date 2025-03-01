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

Add the following code to your main layout file:

```svelte
// +layout.svelte
<script lang="ts">
	import { setContext, onMount } from 'svelte';
	import type { GlobalConfigI } from '@matb85/base-pack';
	import { init } from '@matb85/svelte-pack';

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
	
	onMount(() => {
        init();
   });
</script>
```

Visit [Configuration Reference](/components-pack/start/prepare-images/) to see how to specify `formats` and `enlarged` sizes.