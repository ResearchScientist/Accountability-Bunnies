import { defineConfig } from 'astro/config';
import db from "@astrojs/db";
import netlify from "@astrojs/netlify";

export default defineConfig({
  integrations: [db()],
  output: "server",
  adapter: netlify(),
  security: {
    checkOrigin: true
  }
});
