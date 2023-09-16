import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  return {
    resolve: { alias: { "@": resolve(__dirname, "./src") } },
  };
});
