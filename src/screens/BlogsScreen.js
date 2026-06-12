import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ThemeToggle from '../components/ThemeToggle';
import {DARK_THEME, LIGHT_THEME, useTheme} from '../context/ThemeContext';

const BASE_URL = 'https://devzaidbackend.onrender.com';

export default function BlogsScreen({navigation}) {
  const {theme} = useTheme();
  const colors = theme === 'dark' ? DARK_THEME : LIGHT_THEME;
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/content/blogs`);
      const data = await response.json();
      const list = Array.isArray(data) ? data : data.blogs || [];
      setBlogs(list);
      setError('');
    } catch (err) {
      setError('Unable to load blogs right now.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const renderBlog = ({item}) => {
    const title = item.title || item.name || 'Untitled blog';
    const snippet = item.description || item.excerpt || item.summary || (item.content ? item.content.slice(0, 120) : 'Tap to read the full post.');
    const blogId = item.id || item._id || item.blogId;

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate('BlogDetail', {blogId})}
        style={[styles.card, {backgroundColor: colors.surface, borderColor: colors.border}]}> 
        <View style={styles.cardTopRow}>
          <Text style={[styles.cardTitle, {color: colors.text}]}>{title}</Text>
          <View style={[styles.badge, {backgroundColor: colors.primaryGlow}]}> 
            <Text style={[styles.badgeText, {color: colors.primary}]}>Blog</Text>
          </View>
        </View>
        <Text style={[styles.cardBody, {color: colors.textMuted}]}>{snippet}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}> 
      <View style={styles.header}> 
        <View style={{flex: 1}}>
          <Text style={[styles.title, {color: colors.text}]}>My Blog Posts</Text>
          <Text style={[styles.subtitle, {color: colors.textMuted}]}>Stories, ideas, and developer notes in one place.</Text>
        </View>
        <ThemeToggle />
      </View>

      {loading ? (
        <View style={styles.stateBox}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.stateText, {color: colors.textMuted}]}>Loading articles...</Text>
        </View>
      ) : error ? (
        <View style={styles.stateBox}>
          <Text style={[styles.stateText, {color: colors.error}]}>{error}</Text>
          <TouchableOpacity style={[styles.retryBtn, {backgroundColor: colors.primary}]} onPress={fetchBlogs}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={blogs}
          keyExtractor={(item, index) => String(item.id || item._id || index)}
          renderItem={renderBlog}
          contentContainerStyle={styles.listContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchBlogs(); }} tintColor={colors.primary} />}
          ListEmptyComponent={<Text style={[styles.emptyText, {color: colors.textMuted}]}>No blogs are available yet.</Text>}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12},
  title: {fontSize: 24, fontWeight: '700'},
  subtitle: {marginTop: 4, fontSize: 13},
  listContent: {paddingHorizontal: 20, paddingBottom: 20},
  card: {borderRadius: 18, padding: 16, marginBottom: 14, borderWidth: 1},
  cardTopRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  cardTitle: {fontSize: 17, fontWeight: '700', flex: 1, marginRight: 8},
  badge: {paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999},
  badgeText: {fontSize: 11, fontWeight: '700'},
  cardBody: {marginTop: 10, fontSize: 14, lineHeight: 20},
  stateBox: {flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24},
  stateText: {marginTop: 12, fontSize: 15, textAlign: 'center'},
  retryBtn: {marginTop: 14, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 999},
  retryText: {color: '#fff', fontWeight: '700'},
  emptyText: {textAlign: 'center', marginTop: 16, fontSize: 14},
});
