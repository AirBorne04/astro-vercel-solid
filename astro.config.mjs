import { defineConfig } from "astro/config";

// https://astro.build/config
import vercel from "@astrojs/vercel/edge";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
});
