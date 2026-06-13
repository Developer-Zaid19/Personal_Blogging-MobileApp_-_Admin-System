import AsyncStorage from '@react-native-async-storage/async-storage';

export const BLOG_CACHE_PREFIX = 'cachedBlog:';
export const BLOG_NOTES_CACHE_KEY = 'cachedNotes';
export const BLOGS_CACHE_KEY = 'cachedBlogs';

export const saveBlogsToCache = async blogs => {
  try {
    await AsyncStorage.setItem(BLOGS_CACHE_KEY, JSON.stringify(blogs));
  } catch (error) {
    // ignore storage issues
  }
};

export const getCachedBlogs = async () => {
  try {
    const value = await AsyncStorage.getItem(BLOGS_CACHE_KEY);
    return value ? JSON.parse(value) : [];
  } catch (error) {
    return [];
  }
};

export const saveBlogToCache = async blog => {
  try {
    if (!blog?.id && !blog?._id) {
      return;
    }

    const blogId = blog.id || blog._id;
    await AsyncStorage.setItem(`${BLOG_CACHE_PREFIX}${blogId}`, JSON.stringify(blog));
  } catch (error) {
    // ignore storage issues
  }
};

export const getCachedBlog = async blogId => {
  if (!blogId) {
    return null;
  }

  try {
    const directValue = await AsyncStorage.getItem(`${BLOG_CACHE_PREFIX}${blogId}`);
    if (directValue) {
      return JSON.parse(directValue);
    }

    const listValue = await AsyncStorage.getItem(BLOGS_CACHE_KEY);
    if (listValue) {
      const cachedBlogs = JSON.parse(listValue);
      if (Array.isArray(cachedBlogs)) {
        return cachedBlogs.find(blog => String(blog?.id || blog?._id || blog?.blogId) === String(blogId)) || null;
      }
    }

    return null;
  } catch (error) {
    return null;
  }
};

export const saveNotesCache = async notes => {
  try {
    await AsyncStorage.setItem(BLOG_NOTES_CACHE_KEY, JSON.stringify(notes));
  } catch (error) {
    // ignore storage issues
  }
};

export const getNotesCache = async () => {
  try {
    const value = await AsyncStorage.getItem(BLOG_NOTES_CACHE_KEY);
    return value ? JSON.parse(value) : [];
  } catch (error) {
    return [];
  }
};
