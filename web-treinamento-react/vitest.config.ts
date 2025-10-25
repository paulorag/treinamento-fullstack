/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true, // Habilita describe, it, expect globalmente
        environment: "jsdom", // Simula o ambiente do navegador
        setupFiles: "./vitest.setup.ts", // Arquivo de setup
    },
});
