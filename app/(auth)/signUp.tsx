import React, { useState } from 'react';
import { View, Text, TextInput, SafeAreaView, TouchableOpacity } from 'react-native'; // Removed ActivityIndicator
import { router } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
// Assuming FirebaseConfig.ts is correctly set up and exported 'auth'
import { auth } from '../../FirebaseConfig'; // Adjust this import path if necessary based on your exact file structure

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            if (user) router.replace('/signIn');
        } catch (error: any) {
            console.log(error);
            alert('Sign up failed: ' + error.message); // Reverted to original alert
        }
    };
    const login = () => {
        router.replace('/signIn')
    }

    return (
        // SafeAreaView for proper padding on devices with notches/dynamic islands
        <SafeAreaView className="flex-1 bg-gray-900 justify-center items-center p-6">
            {/* Main content container */}
            <View className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg">
                {/* Title */}
                <Text className="text-white text-4xl font-extrabold mb-8 text-center">
                    Sign Up
                </Text>

                {/* Email Input */}
                <TextInput
                    className="w-full bg-gray-700 text-white text-lg p-4 rounded-xl mb-4 border border-gray-600 focus:border-blue-500"
                    placeholder="Email"
                    placeholderTextColor="#9ca3af" // Tailwind gray-400
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                {/* Password Input */}
                <TextInput
                    className="w-full bg-gray-700 text-white text-lg p-4 rounded-xl mb-6 border border-gray-600 focus:border-blue-500"
                    placeholder="Password"
                    placeholderTextColor="#9ca3af"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                {/* Sign Up Button */}
                <TouchableOpacity
                    className="w-full p-4 rounded-xl flex-row justify-center items-center bg-blue-700 shadow-md"
                    onPress={register}
                >
                    <Text className="text-white text-xl font-bold">Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="w-full p-4 rounded-xl flex-row justify-center items-center bg-blue-700 shadow-md mt-2"
                    onPress={login}
                >
                    <Text className="text-white text-xl font-bold">Already have an account?</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}