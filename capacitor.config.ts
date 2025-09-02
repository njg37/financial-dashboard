import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.financialdashboard',
  appName: 'financial-dashboard',
  webDir: 'out' // <-- points to Next.js static export
};

export default config;
