// capacitor.config.ts
const config = {
  appId: 'io.ionic.starter',
  appName: 'rentingApp',
  webDir: 'www',
  plugins: {
    Camera: {
      allowEditing: false,
      resultType: "uri"
    }
  }
};

export default config;
