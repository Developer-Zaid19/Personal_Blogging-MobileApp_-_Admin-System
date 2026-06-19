import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    RefreshControl,
} from "react-native";
import tw from "twrnc";

import ThemeToggle from "../components/ThemeToggle";
import {
    DARK_THEME,
    LIGHT_THEME,
    useTheme,
} from "../context/ThemeContext";

const BASE_URL = "https://devzaidbackend.onrender.com";

export default function AdminScreen({ navigation }) {
    const { theme } = useTheme();
    const colors = theme === "dark" ? DARK_THEME : LIGHT_THEME;

    const [stats, setStats] = useState({
        blogs: 0,
        notes: 0,
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [refreshing, setRefreshing] = useState(false);


    const onRefresh = async () => {
        try {
            setRefreshing(true);

            await Promise.all([
                fetchStats()
            ]);

        } catch (err) {
            console.log(err);
        } finally {
            setRefreshing(false);
        }
    };

    const fetchStats = async () => {
        try {
            setLoading(true);

            const [blogsRes, notesRes] = await Promise.all([
                fetch(`${BASE_URL}/api/content/totalblog`),
                fetch(`${BASE_URL}/api/content/totalnotes`),
            ]);

            const blogsData = await blogsRes.json();
            const notesData = await notesRes.json();

            setStats({
                blogs: blogsData.total || 0,
                notes: notesData.total || 0,
            });

            setError("");
        } catch (err) {
            setError("Unable to load analytics.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
        onRefresh();
    }, []);

    return (
        <SafeAreaView
            style={[
                tw`flex-1`,
                { backgroundColor: colors.background },
            ]}
        >
            <View
                style={tw`flex-row items-center justify-between px-5 pt-4 pb-3`}
            >
                <View style={tw`flex-1`}>
                    <Text
                        style={[
                            tw`text-xl font-bold mb-1`,
                            { color: colors.primary },
                        ]}
                    >
                        DeveloperZaid
                    </Text>

                    <Text
                        style={[
                            tw`text-2xl font-bold`,
                            { color: colors.text },
                        ]}
                    >
                        Admin Dashboard
                    </Text>

                    <Text
                        style={[
                            tw`text-sm mt-1`,
                            { color: colors.textMuted },
                        ]}
                    >
                        Upload, Delete and Analytics in one place.
                    </Text>
                </View>

                <ThemeToggle />
            </View>

            {loading ? (
                <View style={tw`flex-1 justify-center items-center`}>
                    <ActivityIndicator
                        size="large"
                        color={colors.primary}
                    />
                    <Text
                        style={[
                            tw`mt-3`,
                            { color: colors.textMuted },
                        ]}
                    >
                        Loading analytics...
                    </Text>
                </View>
            ) : error ? (
                <View
                    style={tw`flex-1 justify-center items-center px-6`}
                >
                    <Text
                        style={[
                            tw`text-center`,
                            { color: colors.error || "red" },
                        ]}
                    >
                        {error}
                    </Text>

                    <TouchableOpacity
                        onPress={fetchStats}
                        style={[
                            tw`mt-4 px-5 py-3 rounded-full`,
                            { backgroundColor: colors.primary },
                        ]}
                    >
                        <Text style={tw`text-white font-bold`}>
                            Retry
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <ScrollView
                    contentContainerStyle={tw`p-5`}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />}
                >

                    <View style={tw`flex-row`}>
                        <View
                            style={[
                                tw`flex-1 rounded-3xl p-5 mr-2`,
                                {
                                    backgroundColor:
                                        colors.card ||
                                        (theme === "dark"
                                            ? "#111827"
                                            : "#FFFFFF"),
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    tw`text-xs font-bold uppercase`,
                                    { color: colors.textMuted },
                                ]}
                            >
                                Total Blogs
                            </Text>

                            <Text
                                style={[
                                    tw`text-4xl font-bold mt-2`,
                                    { color: colors.primary },
                                ]}
                            >
                                {stats.blogs}
                            </Text>
                        </View>

                        <View
                            style={[
                                tw`flex-1 rounded-3xl p-5 ml-2`,
                                {
                                    backgroundColor:
                                        colors.card ||
                                        (theme === "dark"
                                            ? "#111827"
                                            : "#FFFFFF"),
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    tw`text-xs font-bold uppercase`,
                                    { color: colors.textMuted },
                                ]}
                            >
                                Total Notes
                            </Text>

                            <Text
                                style={[
                                    tw`text-4xl font-bold mt-2`,
                                    { color: colors.primary },
                                ]}
                            >
                                {stats.notes}
                            </Text>
                        </View>
                    </View>

                    <View
                        style={[
                            tw`mt-5 rounded-3xl p-5`,
                            {
                                backgroundColor:
                                    colors.card ||
                                    (theme === "dark"
                                        ? "#111827"
                                        : "#FFFFFF"),
                            },
                        ]}
                    >
                        <Text
                            style={[
                                tw`text-lg font-bold`,
                                { color: colors.text },
                            ]}
                        >
                            Quick Summary
                        </Text>

                        <Text
                            style={[
                                tw`mt-2`,
                                { color: colors.textMuted },
                            ]}
                        >
                            You currently have {stats.blogs} blogs and{" "}
                            {stats.notes} notes available on your platform.
                        </Text>
                    </View>
                </ScrollView>
            )
            }

            <TouchableOpacity
                onPress={() => navigation.navigate("UploadBlog")}
                style={[
                    tw`mt-5 rounded-3xl p-5 mx-4`,
                    {
                        backgroundColor: colors.card,
                        borderWidth: 1,
                        borderColor: colors.primary,
                    },
                ]}
            >
                <Text
                    style={[
                        tw`text-lg font-bold`,
                        { color: colors.primary },
                    ]}
                >
                    Upload Blog
                </Text>

                <Text
                    style={[
                        tw`mt-1`,
                        { color: colors.textMuted },
                    ]}
                >
                    Create and publish a new blog post
                </Text>
            </TouchableOpacity>
        </SafeAreaView >
    );
}