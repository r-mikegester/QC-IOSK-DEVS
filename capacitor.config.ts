import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'qcu.iosk',
  appName: 'qcu-iosk',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
