/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SANITY_PROJECT_ID: string;
    readonly VITE_SANITY_DATASET: string;
    readonly VITE_STRIPE_PUBLISHABLE_KEY: string;
    // add any other VITE_ variables here for autocomplete
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }