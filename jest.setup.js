// Jest setup for React Native Testing Library

// Mock Expo globals and winter runtime
global.__ExpoImportMetaRegistry = {};
global.structuredClone = (val) => JSON.parse(JSON.stringify(val));

// Mock expo-constants
jest.mock('expo-constants', () => ({
  __esModule: true,
  default: {
    expoConfig: {
      extra: {
        announcementsToken: 'mock-announcements-token',
        heroSliderToken: 'mock-hero-slider-token',
      },
    },
  },
  expoConfig: {
    extra: {
      announcementsToken: 'mock-announcements-token',
      heroSliderToken: 'mock-hero-slider-token',
    },
  },
}));

// Mock expo-font
jest.mock('expo-font', () => ({
  loadAsync: jest.fn(() => Promise.resolve()),
  isLoaded: jest.fn(() => true),
}));

// Mock expo-video
jest.mock('expo-video', () => ({
  VideoView: 'VideoView',
  useVideoPlayer: jest.fn(() => ({
    play: jest.fn(),
    pause: jest.fn(),
    loop: true,
    muted: true,
  })),
}));

// Mock expo-linear-gradient
jest.mock('expo-linear-gradient', () => ({
  LinearGradient: 'LinearGradient',
}));

// Mock @react-navigation/native
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  NavigationContainer: ({ children }) => children,
}));

