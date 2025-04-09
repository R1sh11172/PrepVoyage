import 'dotenv/config';

export default {
  expo: {
    name: "PrepVoyage",
    slug: "prepvoyage",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/pv_updated_logo.png",
    splash: {
      image: "./assets/pv_updated_logo.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      locationIq: process.env.LOCATION_IQ_KEY,
      unsplashKey: process.env.UNSPLASH_ACCESS_KEY,
      geminiKey: process.env.GEMINI_API_KEY,
      stripeKey: process.env.STRIPE_PUBLISHABLE_KEY,
      apiUrl: process.env.STRIPE_API_BASE_URL,
    }
  }
};
