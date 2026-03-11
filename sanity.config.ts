/// <reference types="vite/client" />
// sanity.config.ts
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import product from './src/schemas/product';

// Vite handles the env loading. 
const projectId = "tym561ok";
const dataset = "production"

export default defineConfig({
  name: 'default',
  title: 'Sister’s Shop Admin',

  projectId: projectId,
  dataset: dataset || 'production',

  plugins: [structureTool()],

  schema: {
    types: [product],
  },
});