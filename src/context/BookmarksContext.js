import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookmarksContext = createContext({
  bookmarks: [],
  toggleBookmark: () => {},
  isBookmarked: () => false,
});

export const BookmarksProvider = ({children}) => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const saved = await AsyncStorage.getItem('blogBookmarks');
        if (saved) {
          setBookmarks(JSON.parse(saved));
        }
      } catch (error) {
        // ignore storage issues
      }
    };

    loadBookmarks();
  }, []);

  const toggleBookmark = async (item) => {
    const id = item?.id || item?._id || item?.blogId;
    if (!id) {
      return;
    }

    const next = bookmarks.some((entry) => (entry.id || entry._id || entry.blogId) === id)
      ? bookmarks.filter((entry) => (entry.id || entry._id || entry.blogId) !== id)
      : [...bookmarks, item];

    setBookmarks(next);
    try {
      await AsyncStorage.setItem('blogBookmarks', JSON.stringify(next));
    } catch (error) {
      // ignore storage issues
    }
  };

  const isBookmarked = (item) => {
    const id = item?.id || item?._id || item?.blogId;
    return bookmarks.some((entry) => (entry.id || entry._id || entry.blogId) === id);
  };

  const value = useMemo(() => ({bookmarks, toggleBookmark, isBookmarked}), [bookmarks]);

  return <BookmarksContext.Provider value={value}>{children}</BookmarksContext.Provider>;
};

export const useBookmarks = () => useContext(BookmarksContext);
