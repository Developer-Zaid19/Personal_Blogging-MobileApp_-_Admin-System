import React, { useState, useEffect } from "react";
import {
    ActivityIndicator,
    Alert,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import tw from "twrnc";
import Config from 'react-native-config';
import ThemeToggle from "../components/ThemeToggle";
import { DARK_THEME, LIGHT_THEME, useTheme } from "../context/ThemeContext";

const BASE_URL = "https://devzaidbackend.onrender.com";

export default function EditBlogScreen({ route, navigation }) {
    const { theme } = useTheme();
    const colors = theme === "dark" ? DARK_THEME : LIGHT_THEME;
    const { blogId } = route.params;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [para1, setPara1] = useState("");
    const [para2, setPara2] = useState("");
    const [loading, setLoading] = useState(false);
    const apikey = Config.VERIFY_PASS

    const updateBlog = async () => {
        if (!title.trim() || !description.trim() || !content.trim()) {
            Alert.alert("Error", "Please fill all required fields.");
            return;
        }
        try {
            setLoading(true);

            const response = await fetch(`${BASE_URL}/api/content/updateblog/${blogId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    verifypass: apikey,
                    title: title,
                    description: description,
                    content: content,
                    para1: para1,
                    para2: para2,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Upload failed");
            }

            Alert.alert("Success", "Blog updated successfully");

            setTitle("");
            setDescription("");
            setContent("");
            setPara1("");
            setPara2("");
        } catch (err) {
            Alert.alert("Error", err.message);
        } finally {
            setLoading(false);
        }


    };

    const loadBlog = async () => {
        try {

            const response = await fetch(
                `${BASE_URL}/api/content/blogs/${blogId}`
            );

            const data = await response.json();

            setTitle(data.title || "");
            setDescription(data.description || "");
            setContent(data.content || "");
            setPara1(data.para1 || "");
            setPara2(data.para2 || "");

        } catch (err) {
            Alert.alert("Error", "Failed to load blog");
        }
    };

    useEffect(() => {
        loadBlog();
    }, []);

    return (
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: colors.background }]}>
            <View style={tw`flex-row items-center justify-between px-5 pt-4 pb-3`}>
            <View>
                <Text style={[tw`text-2xl font-bold`, { color: colors.text }]}>Update Blog</Text>
            </View>
                <ThemeToggle />
            </View>

            <ScrollView contentContainerStyle={tw`p-5 pb-10`} showsVerticalScrollIndicator={false}>
                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Title"
                    placeholderTextColor={colors.textMuted}
                    style={[tw`rounded-2xl p-4 mb-4`, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border, borderWidth: 1, }]}
                />

                <TextInput
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Description"
                    placeholderTextColor={colors.textMuted}
                    multiline
                    style={[tw`rounded-2xl p-4 mb-4`, { backgroundColor: colors.card, color: colors.text, minHeight: 80, borderColor: colors.border, borderWidth: 1, }]}
                />

                <TextInput
                    value={content}
                    onChangeText={setContent}
                    placeholder="Paragraph 1"
                    placeholderTextColor={colors.textMuted}
                    multiline
                    style={[tw`rounded-2xl p-4 mb-4`, { backgroundColor: colors.card, color: colors.text, minHeight: 150, borderColor: colors.border, borderWidth: 1, }]}
                />

                <TextInput
                    value={para1}
                    onChangeText={setPara1}
                    placeholder="Paragraph 2"
                    placeholderTextColor={colors.textMuted}
                    multiline
                    style={[tw`rounded-2xl p-4 mb-4`, { backgroundColor: colors.card, color: colors.text, minHeight: 120, borderColor: colors.border, borderWidth: 1, }]}
                />

                <TextInput
                    value={para2}
                    onChangeText={setPara2}
                    placeholder="Paragraph 3"
                    placeholderTextColor={colors.textMuted}
                    multiline
                    style={[tw`rounded-2xl p-4 mb-6`, { backgroundColor: colors.card, color: colors.text, minHeight: 120, borderColor: colors.border, borderWidth: 1, }]}
                />

                <TouchableOpacity
                    disabled={loading}
                    onPress={updateBlog}
                    style={[tw`rounded-2xl py-4 items-center`, { backgroundColor: colors.primary }]}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={tw`text-white font-bold text-base`}>Update Blog</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>


    );
}