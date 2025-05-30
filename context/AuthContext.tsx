// ./context/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import auth from '@react-native-firebase/auth'; // Ensure @react-native-firebase/app is also installed and configured

export async function getCurrentUser() {
    const user = auth().currentUser;
    console.log("getCurrentUser: Firebase currentUser:", user);
    return user
}

export async function isAuthenticated(): Promise<boolean> {
    const user = await getCurrentUser();
    const authenticated = !!user;
    console.log("isAuthenticated: User authenticated?", authenticated);
    return authenticated;
}

// You might consider adding a context provider here for login/logout actions
// if you want to manage authentication state globally in a more React-friendly way.
// Example (optional but recommended for larger apps):
/*
interface AuthContextType {
    user: auth.User | null;
    isLoading: boolean;
    login: (email, password) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<auth.User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(user => {
            setUser(user);
            setIsLoading(false);
        });
        return subscriber; // unsubscribe on unmount
    }, []);

    const login = async (email, password) => {
        setIsLoading(true);
        try {
            await auth().signInWithEmailAndPassword(email, password);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await auth().signOut();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
*/