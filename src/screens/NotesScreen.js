import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Linking,
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

export default function NotesScreen({navigation}) {
  const {theme} = useTheme();
  const colors = theme === 'dark' ? DARK_THEME : LIGHT_THEME;
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const fetchNotes = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/content/notes`);
      const data = await response.json();
      const list = Array.isArray(data) ? data : data.notes || [];
      setNotes(list);
      setError('');
    } catch (err) {
      setError('Unable to load notes right now.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const openPdf = async (note) => {
    const id = note.id || note._id || note.noteId;
    if (!id) {
      Alert.alert('Missing PDF id');
      return;
    }

    const pdfUrl = `${BASE_URL}/note-pdf/${id}.pdf`;
    const viewerUrl = `https://docs.google.com/viewer?embedded=true&url=${encodeURIComponent(pdfUrl)}`;

    try {
      const canOpen = await Linking.canOpenURL(pdfUrl);
      if (canOpen) {
        await Linking.openURL(pdfUrl);
        return;
      }
    } catch (error) {
      // fall through to viewer fallback
    }

    try {
      await Linking.openURL(viewerUrl);
    } catch (error) {
      Alert.alert('Unable to open PDF', 'The file could not be opened right now. Please check your internet connection and try again.');
    }
  };

  const renderNote = ({item}) => {
    const title = item.title || item.name || 'Untitled note';
    const description = item.description || item.summary || 'Tap to view details or download the PDF.';

    return (
      <View style={[styles.card, {backgroundColor: colors.surface, borderColor: colors.border}]}> 
        <Text style={[styles.cardTitle, {color: colors.text}]}>{title}</Text>
        <Text style={[styles.cardBody, {color: colors.textMuted}]}>{description}</Text>
        <View style={styles.actions}> 
          <TouchableOpacity onPress={() => navigation.navigate('NoteDetail', {note: item})} style={[styles.secondaryBtn, {borderColor: colors.border}]}> 
            <Text style={[styles.secondaryText, {color: colors.text}]}>View details</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openPdf(item)} style={[styles.primaryBtn, {backgroundColor: colors.primary}]}> 
            <Text style={styles.primaryText}>Open PDF</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}> 
      <View style={styles.header}> 
        <View style={{flex: 1}}>
          <Text style={[styles.title, {color: colors.text}]}>PDF Notes</Text>
          <Text style={[styles.subtitle, {color: colors.textMuted}]}>Download and review study notes instantly.</Text>
        </View>
        <ThemeToggle />
      </View>

      {loading ? (
        <View style={styles.stateBox}> 
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.stateText, {color: colors.textMuted}]}>Loading notes...</Text>
        </View>
      ) : error ? (
        <View style={styles.stateBox}> 
          <Text style={[styles.stateText, {color: colors.error}]}>{error}</Text>
          <TouchableOpacity style={[styles.retryBtn, {backgroundColor: colors.primary}]} onPress={fetchNotes}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item, index) => String(item.id || item._id || index)}
          renderItem={renderNote}
          contentContainerStyle={styles.listContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchNotes(); }} tintColor={colors.primary} />}
          ListEmptyComponent={<Text style={[styles.emptyText, {color: colors.textMuted}]}>No notes available yet.</Text>}
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
  cardTitle: {fontSize: 17, fontWeight: '700'},
  cardBody: {marginTop: 8, fontSize: 14, lineHeight: 20},
  actions: {flexDirection: 'row', marginTop: 14, gap: 10},
  primaryBtn: {flex: 1, paddingVertical: 10, borderRadius: 999, alignItems: 'center'},
  primaryText: {color: '#fff', fontWeight: '700'},
  secondaryBtn: {flex: 1, paddingVertical: 10, borderRadius: 999, alignItems: 'center', borderWidth: 1},
  secondaryText: {fontWeight: '600'},
  stateBox: {flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24},
  stateText: {marginTop: 12, fontSize: 15, textAlign: 'center'},
  retryBtn: {marginTop: 14, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 999},
  retryText: {color: '#fff', fontWeight: '700'},
  emptyText: {textAlign: 'center', marginTop: 16, fontSize: 14},
});
