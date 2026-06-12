import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DARK_THEME, LIGHT_THEME, useTheme} from '../context/ThemeContext';
import {useBookmarks} from '../context/BookmarksContext';

export default function BookmarksScreen({navigation}) {
  const {theme} = useTheme();
  const colors = theme === 'dark' ? DARK_THEME : LIGHT_THEME;
  const {bookmarks, toggleBookmark} = useBookmarks();

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}> 
      <ScrollView contentContainerStyle={styles.content}> 
        <View style={styles.headerRow}> 
          <View style={{flex: 1}}>
            <Text style={[styles.title, {color: colors.text}]}>Bookmarks</Text>
            <Text style={[styles.subtitle, {color: colors.textMuted}]}>Saved blogs for later reading.</Text>
          </View>
        </View>

        {bookmarks.length === 0 ? (
          <View style={[styles.emptyCard, {backgroundColor: colors.surface, borderColor: colors.border}]}> 
            <Text style={[styles.emptyText, {color: colors.textMuted}]}>No bookmarked blogs yet.</Text>
          </View>
        ) : (
          bookmarks.map((item, index) => {
            const title = item.title || item.name || 'Untitled blog';
            const blogId = item.id || item._id || item.blogId;

            return (
              <View key={String(blogId || index)} style={[styles.card, {backgroundColor: colors.surface, borderColor: colors.border}]}> 
                <View style={styles.cardTopRow}> 
                  <TouchableOpacity style={{flex: 1}} onPress={() => navigation.navigate('BlogDetail', {blogId})}>
                    <Text style={[styles.cardTitle, {color: colors.text}]}>{title}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => toggleBookmark(item)}>
                    <Icon name="bookmark" size={20} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  content: {padding: 20, paddingBottom: 32},
  headerRow: {marginBottom: 16},
  title: {fontSize: 24, fontWeight: '700'},
  subtitle: {marginTop: 4, fontSize: 13},
  emptyCard: {borderRadius: 18, borderWidth: 1, padding: 20, alignItems: 'center'},
  emptyText: {fontSize: 14},
  card: {borderRadius: 18, borderWidth: 1, padding: 16, marginBottom: 12},
  cardTopRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  cardTitle: {fontSize: 16, fontWeight: '700'},
});
