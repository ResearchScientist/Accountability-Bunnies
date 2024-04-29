import { defineConfig } from 'astro/config';
import db from "@astrojs/db";
import netlify from "@astrojs/netlify";

export default defineConfig({
  integrations: [db()],
  output: "static",
  adapter: netlify()
});
