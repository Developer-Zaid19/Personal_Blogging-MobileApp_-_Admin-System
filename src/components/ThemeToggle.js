import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme, DARK_THEME, LIGHT_THEME} from '../context/ThemeContext';

export default function ThemeToggle() {
  const {theme, toggleTheme} = useTheme();
  const colors = theme === 'dark' ? DARK_THEME : LIGHT_THEME;

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      activeOpacity={0.8}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 999,
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
      }}>
      <Icon
        name={theme === 'dark' ? 'weather-night' : 'white-balance-sunny'}
        size={18}
        color={colors.primary}
      />
      <Text
        style={{
          marginLeft: 6,
          fontSize: 13,
          fontWeight: '600',
          color: colors.text,
        }}>
        {theme === 'dark' ? 'Dark' : 'Light'}
      </Text>
    </TouchableOpacity>
  );
}
