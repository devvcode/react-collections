import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // The collection build sets this to "/serene-journal/"; standalone use stays at "/".
  base: process.env.APP_BASE_PATH || "/",
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true
  }
});
