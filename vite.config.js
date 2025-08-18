import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { dirname, resolve } from "path"; //Import this
import { fileURLToPath } from "url"; //Import this

const __filename = fileURLToPath(import.meta.url); //Add this
const __dirname = dirname(__filename); //Add this

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, ".src"),
    },
  },

  plugins: [react(), tailwindcss()],
});
