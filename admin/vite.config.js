import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 4173, // Use Render's port or default to 4173
    host: "0.0.0.0", // Bind to all network interfaces
  },
  preview: {
    port: 4173,
    host: "0.0.0.0",
    allowedHosts: ["e-commerse-1-25gc.onrender.com"], // Add your Render domain here
  },
});
