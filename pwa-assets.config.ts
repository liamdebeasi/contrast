import { defineConfig } from '@vite-pwa/assets-generator/config'
import type { Preset } from '@vite-pwa/assets-generator/config';

export const customPreset: Preset = {
  transparent: {
    sizes: [64, 192, 512],
    favicons: [[64, 'favicon.ico']]
  },
  maskable: {
    sizes: [512]
  },
  apple: {
    sizes: [256]
  }
}

export default defineConfig({
  preset: customPreset,
  images: ['public/contrast-logo.svg']
})