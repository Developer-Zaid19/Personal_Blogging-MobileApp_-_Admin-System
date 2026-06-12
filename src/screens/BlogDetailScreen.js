import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DARK_THEME, LIGHT_THEME, useTheme} from '../context/ThemeContext';

const BASE_URL = 'https://devzaidbackend.onrender.com';

export default function BlogDetailScreen({route, navigation}) {
  const {theme} = useTheme();
  const colors = theme === 'dark' ? DARK_THEME : LIGHT_THEME;
  const {blogId} = route.params || {};
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      if (!blogId) {
        setError('Blog could not be loaded.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/api/content/blogs/${blogId}`);
        const data = await response.json();
        setBlog(data);
        setError('');
      } catch (err) {
        setError('Unable to load this blog right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}> 
      <View style={styles.topBar}> 
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backButton, {borderColor: colors.border}]}> 
          <Text style={[styles.backText, {color: colors.text}]}>← Back</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.stateBox}> 
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.stateText, {color: colors.textMuted}]}>Loading article...</Text>
        </View>
      ) : error ? (
        <View style={styles.stateBox}> 
          <Text style={[styles.stateText, {color: colors.error}]}>{error}</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content}> 
          <Text style={[styles.title, {color: colors.text}]}>{blog.title || blog.name || 'Untitled blog'}</Text>
          <Text style={[styles.meta, {color: colors.textMuted}]}>Published {blog.createdAt || blog.updatedAt || 'recently'}</Text>
          <View style={[styles.card, {backgroundColor: colors.surface, borderColor: colors.border}]}> 
            <Text style={[styles.body, {color: colors.text}]}>{blog.content || blog.description || 'No content available.'}</Text>
          </View>
        </ScrollView>
      )}
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
  stateBox: {flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24},
  stateText: {marginTop: 12, fontSize: 15, textAlign: 'center'},
});
