// app/_layout.tsx (Your Original Version)
import './globals.css'; // Make sure this file exists in your project or remove if not needed
import { Slot, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useAuth, AuthProvider } from '@/context/AuthContext'; // Your original import path




function MainLayout() {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const [ready, setReady] = useState(false);




    useEffect(() => {
        setReady(true);
    }, []);




    useEffect(() => {
        if (ready && !isAuthenticated) {
            router.replace('./(auth)/signUp'); // Navigates to signUp if not authenticated
        }
        // Note: This version didn't have logic to redirect to '/(tabs)' if isAuthenticated was true
    }, [ready, isAuthenticated]);




    if (!ready) return null;




    return (
        <>
            <StatusBar barStyle="light-content" />
            <Slot />
        </>
    );
}




export default function RootLayout() {
    return (
        <AuthProvider>
            <MainLayout />
        </AuthProvider>
    );
}
