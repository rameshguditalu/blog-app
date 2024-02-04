import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://blogger-net.netlify.app/",
  assetsInclude: "assets",
  plugins: [react()],
});
