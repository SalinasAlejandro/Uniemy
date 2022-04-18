import { useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const history = useNavigate();

    const isLogged = () => !!user;
    const hasRole = (role) => user?.type === role;

    const login = (userData, fromLocation) => {

        setUser({
            id: userData._id,
            name: userData.name,
            email: userData.email,
            type: userData.type,
            avatar: userData.avatar ? userData.avatar : null
        });
        localStorage.setItem("_id", userData._id);
        if (fromLocation)
            history(fromLocation, { replace: true });
    }
    const logout = () => {

        setUser(null);
        localStorage.setItem("_id", null);

    }

    const updateUser = (data) => {
        setUser({
            ...user,
            ...data
        })
    };

    const contextValue = {
        user,
        isLogged,
        hasRole,
        login,
        logout,
        updateUser
    };

    return <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>

}

