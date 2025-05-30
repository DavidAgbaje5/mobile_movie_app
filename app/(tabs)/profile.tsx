// app/(tabs)/profile.tsx
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Alert,
    ActivityIndicator,
    // StyleSheet // No longer needed for default image styles
    Image // Keep for a potential static icon later
} from 'react-native';
import { router } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth as firebaseAuth } from '@/FirebaseConfig'; // Adjust path to your FirebaseConfig
import { useAuth } from '@/context/AuthContext'; // Adjust path to your AuthContext


// For a simple static icon, if you have one. Otherwise, we can remove Image component.
// For now, let's use a simple text placeholder or a very basic icon if you have one in assets.
// const userIcon = require('@/assets/images/user-icon-placeholder.png'); // Example path


export default function ProfileScreen() {
    const { logout: contextLogout, isAuthenticated } = useAuth(); // Get logout from AuthContext
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);


    useEffect(() => {
        console.log("[ProfileScreen] useEffect triggered. isAuthenticated:", isAuthenticated);
        const currentUser = firebaseAuth.currentUser;
        if (currentUser) {
            console.log("[ProfileScreen] Current Firebase user found:", currentUser.email);
            setUserEmail(currentUser.email);
        } else {
            console.log("[ProfileScreen] No current Firebase user found on mount.");
            // If not authenticated and somehow on this screen, you might want to redirect
            // However, the root layout should typically handle this.
            if (!isAuthenticated) {
                console.log("[ProfileScreen] Not authenticated in context, redirecting to sign-in.");
                // router.replace('/(auth)/signIn'); // Potentially add this if needed
            }
        }
        setIsLoading(false);
    }, [isAuthenticated]); // Re-run if auth state changes


    // const signOutButton = async () => {
    //     router.replace('/(auth)/signIn');
    // }


    const handleSignOut = async () => {
        console.log("[ProfileScreen] Attempting sign out...");
        try {
            await signOut(firebaseAuth); // Sign out from Firebase
            console.log("[ProfileScreen] Firebase sign out successful.");
            await contextLogout(); // Call logout from AuthContext to update global state & clear AsyncStorage
            console.log("[ProfileScreen] AuthContext logout successful.");
            // It's good practice to ensure navigation happens after state updates are likely processed
            router.replace('/(auth)/signIn'); // Navigate to sign-in page
            Alert.alert("Signed Out", "You have been successfully signed out.");
        } catch (error: any) {
            console.error("[ProfileScreen] Sign out failed:", error);
            Alert.alert("Sign Out Error", error.message || "Could not sign out at this time.");
        }
    };


    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 bg-gray-900 justify-center items-center">
                <ActivityIndicator size="large" color="#FFFFFF" />
                <Text className="text-white mt-2">Loading Profile...</Text>
            </SafeAreaView>
        );
    }


    return (
        <SafeAreaView className="flex-1 bg-gray-900">
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingBottom: 20 }}>
                <View className="w-full items-center px-4 mb-10">
                    {/* You can add a static user icon here if you have one */}
                    {/* Example: <Image source={userIcon} className="w-24 h-24 rounded-full mb-4" /> */}
                    <Text className="text-white text-3xl font-bold mb-2">
                        Profile
                    </Text>
                    <Text className="text-gray-300 text-lg mb-6">
                        {userEmail || 'Loading email...'}
                    </Text>
                </View>


                {/* Sign Out Button */}
                <View className="px-6">
                    <TouchableOpacity
                        className="bg-red-600 p-4 rounded-xl flex-row justify-center items-center shadow-md"
                        onPress={handleSignOut}
                    >
                        <Text className="text-white text-lg font-bold">Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
