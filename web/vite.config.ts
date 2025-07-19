import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate", // keeps SW fresh
      manifest: {
        short_name: "Prompt Builder",
        name: "Prompt Builder: Build better AI prompts. All in one place.",
        icons: [
          {
            src: "icon.png", // Ideally provide also 192x192 and 512x512 (see below)
            sizes: "128x128",
            type: "image/png",
            purpose: "any",
          },
        ],
        start_url: "/",
        display: "standalone",
        theme_color: "#171717",
        background_color: "#ffffff",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      components: path.resolve(__dirname, "./components"),
    },
  },
  build: {},
});
