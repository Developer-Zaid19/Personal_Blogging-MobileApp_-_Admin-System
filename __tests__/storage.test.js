import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  BLOG_NOTES_CACHE_KEY,
  BLOG_CACHE_PREFIX,
  BLOGS_CACHE_KEY,
  getCachedBlog,
  getNotesCache,
  saveBlogToCache,
  saveNotesCache,
  saveBlogsToCache,
} from '../src/utils/storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

describe('storage helpers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('stores and retrieves cached notes', async () => {
    const notes = [{id: 'note-1', title: 'Offline note'}];
    AsyncStorage.setItem.mockResolvedValue();
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(notes));

    await saveNotesCache(notes);
    const cachedNotes = await getNotesCache();

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(BLOG_NOTES_CACHE_KEY, JSON.stringify(notes));
    expect(cachedNotes).toEqual(notes);
  });

  it('stores and retrieves cached blog content by id', async () => {
    const blog = {id: 'blog-1', title: 'Saved offline blog', content: 'cached'};
    AsyncStorage.setItem.mockResolvedValue();
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(blog));

    await saveBlogToCache(blog);
    const cachedBlog = await getCachedBlog(blog.id);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(`${BLOG_CACHE_PREFIX}${blog.id}`, JSON.stringify(blog));
    expect(cachedBlog).toEqual(blog);
  });

  it('finds a cached blog from the saved blog list when no single-item cache exists', async () => {
    const blogs = [{id: 'blog-2', title: 'List cached blog', content: 'cached from list'}];
    AsyncStorage.setItem.mockResolvedValue();
    AsyncStorage.getItem.mockImplementation((key) => {
      if (key === BLOGS_CACHE_KEY) {
        return Promise.resolve(JSON.stringify(blogs));
      }
      if (key === `${BLOG_CACHE_PREFIX}blog-2`) {
        return Promise.resolve(null);
      }
      return Promise.resolve(null);
    });

    await saveBlogsToCache(blogs);
    const cachedBlog = await getCachedBlog('blog-2');

    expect(cachedBlog).toEqual(blogs[0]);
  });
});
