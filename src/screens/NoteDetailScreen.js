import React from 'react';
import {Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {DARK_THEME, LIGHT_THEME, useTheme} from '../context/ThemeContext';

export default function NoteDetailScreen({route, navigation}) {
  const {theme} = useTheme();
  const colors = theme === 'dark' ? DARK_THEME : LIGHT_THEME;
  const {note} = route.params || {};
  const title = note?.title || note?.name || 'Note';
  const description = note?.description || note?.summary || 'No details available yet.';

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}> 
      <View style={styles.topBar}> 
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backButton, {borderColor: colors.border}]}> 
          <Text style={[styles.backText, {color: colors.text}]}>← Back</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content}> 
        <Text style={[styles.title, {color: colors.text}]}>{title}</Text>
        <Text style={[styles.meta, {color: colors.textMuted}]}>PDF note details</Text>
        <View style={[styles.card, {backgroundColor: colors.surface, borderColor: colors.border}]}> 
          <Text style={[styles.body, {color: colors.text}]}>{description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  topBar: {paddingHorizontal: 20, paddingTop: 12, paddingBottom: 6},
  backButton: {alignSelf: 'flex-start', borderWidth: 1, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999},
  backText: {fontWeight: '600'},
  content: {paddingHorizontal: 20, paddingBottom: 24},
  title: {fontSize: 26, fontWeight: '700', marginTop: 8},
  meta: {marginTop: 8, fontSize: 13},
  card: {marginTop: 16, borderRadius: 18, borderWidth: 1, padding: 16},
  body: {fontSize: 15, lineHeight: 24},
});
