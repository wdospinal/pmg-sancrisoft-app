/**
 * Expo Configuration
 * 
 * To use environment variables:
 * 1. Create a .env file in the project root with:
 *    ANNOUNCEMENTS_TOKEN=your_token_here
 *    HERO_SLIDER_TOKEN=your_token_here
 * 
 * 2. The tokens will be loaded from process.env or fallback to defaults
 * 3. Access them via Constants.expoConfig.extra in your code
 */
export default {
  expo: {
    name: "pmg-sancrisoft-app",
    slug: "pmg-sancrisoft-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.pmg.sancrisfotapp"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.pmg.sancrisfotapp",
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      announcementsToken: process.env.ANNOUNCEMENTS_TOKEN,
      heroSliderToken: process.env.HERO_SLIDER_TOKEN,
      eas: {
        projectId: "f0916b55-252e-4246-b119-f163de874fc9"
      }
    }
  }
};

