import { defineConfig } from '@vite-pwa/assets-generator/config'

export default defineConfig({
  preset: {
    transparent: {
      sizes: [64, 192, 512],
      favicons: [[64, 'favicon.ico']],
      padding: 0
    },
    maskable: {
      sizes: [512],
      padding: 0,
      resizeOptions: {
        background: '#000000'
      }
    },
    apple: {
      sizes: [180],
      padding: 0,
      resizeOptions: {
        background: '#000000'
      }
    }
  },
  images: ['public/contrast-logo.svg']
})