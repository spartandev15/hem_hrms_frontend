/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_KEY_BASE_URL: string;
  // Add any other environment variables you need here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
