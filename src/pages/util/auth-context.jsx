import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const adminUid = import.meta.env.VITE_FIREBASE_UID;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //console.log("Authenticated User UID:", user.uid);
        setUser(user);
        setIsAdmin(user.uid === adminUid); // Check if the user is an admin
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading }}>
      {!loading && children} {/* Render children only when loading is done */}
    </AuthContext.Provider>
  );
};
