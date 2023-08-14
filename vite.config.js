import { defineConfig } from 'vite'
import inject from "@rollup/plugin-inject";

export default defineConfig({
    base: './',
    plugins: [
        inject({   // => that should be first under plugins array
            $: 'jquery',
            jQuery: 'jquery',
        })
    ]
});