/* global jest */

jest.mock('react-native-config', () => ({
  __esModule: true,
  default: {
    HADITH_API_BASE_URL: 'https://www.hadithapi.com/public/api',
    HADITH_API_KEY: 'test-api-key',
    ABOUT_US_URL: 'https://developerzaidblogs.vercel.app',
  },
}));

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
