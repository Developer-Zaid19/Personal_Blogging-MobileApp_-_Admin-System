import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from '../src/screens/HomeScreen';
import {AppSettingsContext} from '../src/context/AppSettingsContext';
import {getTheme} from '../src/theme';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({navigate: jest.fn(), goBack: jest.fn()}),
}));

jest.mock('../src/context/CartContext', () => ({
  ...jest.requireActual('../src/context/CartContext'),
  useCart: () => ({addItem: jest.fn(), cartCount: 0}),
}));

describe('Theme context', () => {
  it('uses the app settings theme on the home screen', () => {
    const lightTheme = getTheme('light');

    const testRenderer = renderer.create(
      <AppSettingsContext.Provider
        value={{
          theme: lightTheme,
          isDarkMode: false,
          mode: 'light',
          displayName: '',
          isReady: true,
          showSplash: false,
          navigationTheme: {},
          setMode: jest.fn(),
          toggleTheme: jest.fn(),
          setDisplayName: jest.fn(),
        }}>
        <HomeScreen />
      </AppSettingsContext.Provider>,
    );

    const greeting = testRenderer.root.findByProps({children: 'Welcome Back 👋'});
    const style = greeting.props.style;
    const resolvedColor = Array.isArray(style)
      ? style.find(item => item && typeof item === 'object' && item.color)?.color
      : style?.color;

    expect(resolvedColor).toBe(lightTheme.colors.textSecondary);
  });
});
