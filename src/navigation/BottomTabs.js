import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BlogsScreen from '../screens/BlogsScreen';
import NotesScreen from '../screens/NotesScreen';
import BlogDetailScreen from '../screens/BlogDetailScreen';
import NoteDetailScreen from '../screens/NoteDetailScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BookmarksScreen from '../screens/BookmarksScreen';
import AdminScreen from '../screens/AdminScreen';
import UploadBlogScreen from '../screens/UploadBlogScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DARK_THEME, LIGHT_THEME, useTheme} from '../context/ThemeContext';

const Tab = createBottomTabNavigator();
const BlogStack = createNativeStackNavigator();
const NoteStack = createNativeStackNavigator();
const AdminStack = createNativeStackNavigator();

function BlogStackScreen() {
  return (
    <BlogStack.Navigator screenOptions={{headerShown: false}}>
      <BlogStack.Screen name="Blogs" component={BlogsScreen} />
      <BlogStack.Screen name="BlogDetail" component={BlogDetailScreen} />
    </BlogStack.Navigator>
  );
}

function NoteStackScreen() {
  return (
    <NoteStack.Navigator screenOptions={{headerShown: false}}>
      <NoteStack.Screen name="Notes" component={NotesScreen} />
      <NoteStack.Screen name="NoteDetail" component={NoteDetailScreen} />
    </NoteStack.Navigator>
  );
}

function AdminStackScreen() {
  return (
    <AdminStack.Navigator screenOptions={{headerShown: false}}>
      <AdminStack.Screen name="Dashboard" component={AdminScreen} />
      <AdminStack.Screen name="UploadBlog" component={UploadBlogScreen} />
    </AdminStack.Navigator>
  );
}

export default function BottomTabs() {
  const {theme} = useTheme();
  const colors = theme === 'dark' ? DARK_THEME : LIGHT_THEME;

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarIcon: ({color, size}) => {
          let iconName = 'post';
          if (route.name === 'BlogTab') {
            iconName = 'book-open-page-variant';
          } else if (route.name === 'NoteTab') {
            iconName = 'file-pdf-box';
          } else if (route.name === 'Bookmarks') {
            iconName = 'bookmark';
          } else if (route.name === 'Settings') {
            iconName = 'cog';
          } else if (route.name === 'AdminTab') {
            iconName = 'cog';
          }

          return <Icon name={iconName} color={color} size={size} />;
        },
      })}>
      <Tab.Screen
        name="BlogTab"
        component={BlogStackScreen}
        options={{tabBarLabel: 'Blogs'}}
      />

      <Tab.Screen name="Bookmarks" component={BookmarksScreen} />

      <Tab.Screen
        name="NoteTab"
        component={NoteStackScreen}
        options={{tabBarLabel: 'Notes'}}
      />

      <Tab.Screen
        name="AdminTab"
        component={AdminStackScreen}
        options={{tabBarLabel: 'Admin'}}
      />

      <Tab.Screen name="Settings" component={SettingsScreen} />

    </Tab.Navigator>
  );
}
