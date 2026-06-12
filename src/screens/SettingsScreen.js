import React, {useEffect, useState} from 'react';
import {
  Alert,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThemeToggle from '../components/ThemeToggle';
import {DARK_THEME, LIGHT_THEME, useTheme} from '../context/ThemeContext';

const APP_VERSION = '1.0.0';
const ABOUT_URL = 'https://blog-developerzaid.vercel.app';

export default function SettingsScreen() {
  const {theme} = useTheme();
  const colors = theme === 'dark' ? DARK_THEME : LIGHT_THEME;
  const [name, setName] = useState('');

  useEffect(() => {
    const loadName = async () => {
      try {
        const savedName = await AsyncStorage.getItem('appUserName');
        if (savedName) {
          setName(savedName);
        }
      } catch (error) {
        // ignore storage issues
      }
    };

    loadName();
  }, []);

  const saveName = async () => {
    try {
      await AsyncStorage.setItem('appUserName', name.trim());
      Alert.alert('Saved', 'Your name has been updated.');
    } catch (error) {
      Alert.alert('Error', 'Unable to save your name right now.');
    }
  };

  const openAbout = async () => {
    try {
      await Linking.openURL(ABOUT_URL);
    } catch (error) {
      Alert.alert('Error', 'Could not open the website.');
    }
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}> 
      <ScrollView contentContainerStyle={styles.content}> 
        <View style={styles.headerArea}> 
          <Text style={[styles.brand, {color: colors.primary}]}>DeveloperZaid</Text>
          <Text style={[styles.subtitle, {color: colors.textMuted}]}>Personal blog app settings</Text>
        </View>

        <View style={[styles.card, {backgroundColor: colors.surface, borderColor: colors.border}]}> 
          <View style={styles.rowBetween}> 
            <Text style={[styles.label, {color: colors.text}]}>App version</Text>
            <Text style={[styles.value, {color: colors.primary}]}>{APP_VERSION}</Text>
          </View>

          <View style={styles.rowBetween}> 
            <Text style={[styles.label, {color: colors.text}]}>Theme</Text>
            <ThemeToggle />
          </View>

          <View style={styles.inputSection}> 
            <Text style={[styles.label, {color: colors.text}]}>Your name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor={colors.textMuted}
              style={[styles.input, {color: colors.text, borderColor: colors.border, backgroundColor: colors.card}]}
              autoCapitalize="words"
            />
            <TouchableOpacity onPress={saveName} style={[styles.saveBtn, {backgroundColor: colors.primary}]}> 
              <Text style={styles.saveBtnText}>Save name</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={openAbout} style={[styles.aboutBtn, {borderColor: colors.border}]}> 
            <Text style={[styles.aboutBtnText, {color: colors.text}]}>About us</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  content: {padding: 20, paddingBottom: 32},
  headerArea: {marginBottom: 20},
  brand: {fontSize: 28, fontWeight: '800'},
  subtitle: {marginTop: 6, fontSize: 14},
  card: {borderRadius: 20, borderWidth: 1, padding: 18},
  rowBetween: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16},
  label: {fontSize: 15, fontWeight: '600'},
  value: {fontSize: 15, fontWeight: '700'},
  inputSection: {marginTop: 8, marginBottom: 12},
  input: {marginTop: 8, borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10},
  saveBtn: {marginTop: 12, paddingVertical: 10, borderRadius: 999, alignItems: 'center'},
  saveBtnText: {color: '#fff', fontWeight: '700'},
  aboutBtn: {marginTop: 10, borderWidth: 1, borderRadius: 999, paddingVertical: 12, alignItems: 'center'},
  aboutBtnText: {fontWeight: '700'},
});
