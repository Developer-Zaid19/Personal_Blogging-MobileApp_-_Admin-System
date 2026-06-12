/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('../src/navigation/AppNavigator', () => 'AppNavigator');
jest.mock('../src/context/AppSettingsContext', () => {
  const React = require('react');

  return {
    AppSettingsProvider: ({children}) => children,
    useAppSettings: () => ({
      isReady: true,
      showSplash: false,
      displayName: '',
      isDarkMode: true,
      theme: {
        colors: {
          background: '#04172B',
        },
      },
      navigationTheme: {},
    }),
  };
});

it('renders correctly', () => {
  renderer.create(<App />);
});
