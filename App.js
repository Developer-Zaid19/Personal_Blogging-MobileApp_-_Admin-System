import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import {ThemeProvider, useTheme, DARK_THEME, LIGHT_THEME} from './src/context/ThemeContext';
import {BookmarksProvider} from './src/context/BookmarksContext';

const AppContent = () => {
  const {theme} = useTheme();
  const colors = theme === 'dark' ? DARK_THEME : LIGHT_THEME;

  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
        <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
        <AppNavigator />
      </SafeAreaView>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <BookmarksProvider>
        <AppContent />
      </BookmarksProvider>
    </ThemeProvider>
  );
};

export default App;
