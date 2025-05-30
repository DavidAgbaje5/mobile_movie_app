// context/AuthContext.tsx
import React, {createContext, useState, useContext, ReactNode, useEffect} from 'react';
import {onAuthStateChanged, User, getAuth} from "firebase/auth";
import { auth } from '@/FirebaseConfig'; // Assuming this correctly imports your Firebase Auth instance


interface AuthContextProps {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const firebaseAuth = getAuth(); // Ensure this gets the same auth instance as `auth` from FirebaseConfig

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    console.log("AuthContext: AuthProvider component rendered/re-rendered."); // Log on render

    useEffect(() => {
        console.log("AuthContext: AuthProvider useEffect for onAuthStateChanged started.");
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            console.log(`AuthContext: onAuthStateChanged callback fired. User: ${firebaseUser ? firebaseUser.uid : 'null'}.`);
            setUser(firebaseUser);
            setLoading(false);
            console.log("AuthContext: User state and loading state updated in AuthProvider.");
        });

        return () => {
            console.log("AuthContext: AuthProvider useEffect cleanup (unsubscribe) called.");
            unsubscribe();
        };
    }, []); // Runs once on mount

    const login = () => {
        console.log("AuthContext: login function called.");
    };  // optional: hook for manual triggers
    const logout = () => {
        console.log("AuthContext: logout function called. Signing out...");
        auth.signOut();
        setUser(null);
    };

    const isAuthenticatedValue = !!user; // Derive this once
    console.log(`AuthContext: AuthContext.Provider value - isAuthenticated: ${isAuthenticatedValue}, loading: ${loading}`);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: isAuthenticatedValue, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


export function getCurrentUser(): Promise<User | null> {
    console.log("AuthContext: getCurrentUser() function called.");
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            console.log(`AuthContext: getCurrentUser's onAuthStateChanged callback fired. User: ${user ? user.uid : 'null'}.`);
            resolve(user);
            console.log("AuthContext: getCurrentUser's listener unsubscribed.");
            unsubscribe(); // Unsubscribe immediately
        });
    });
}

// This function is the one called from _layout.tsx
export async function isAuthenticated(): Promise<boolean> {
    console.log("AuthContext: isAuthenticated() (async) function called from _layout.");
    const user = await getCurrentUser();
    const authenticated = !!user;
    console.log("AuthContext: isAuthenticated() (async) resolved. User authenticated?", authenticated);
    return authenticated;
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};