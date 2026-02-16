import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig(() => {
  const enableInspect = process.env.INSPECT === '1' || process.env.VITE_INSPECT === '1'
  const plugins = [...react()]
  if (enableInspect) plugins.unshift(inspectAttr())

  return {
    base: './',
    plugins,
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          blogPostValidation: path.resolve(__dirname, 'blog/how-we-validate-domain-data-before-model-training/index.html'),
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
});
