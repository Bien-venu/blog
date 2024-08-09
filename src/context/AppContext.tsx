/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AppContextType {
  user: { token: string; loginTime: Date } | null;
  setUser: React.Dispatch<
    React.SetStateAction<{ token: string; loginTime: Date } | null>
  >;
  posts: any[]; // Adjust type according to your posts structure
  loading: boolean;
  error: string | null;
}

// Create a default context value
const defaultContextValue: AppContextType = {
  user: null,
  setUser: () => {},
  posts: [],
  loading: false,
  error: null,
};

// Create the context with the default value
const AppContext = createContext<AppContextType>(defaultContextValue);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ token: string; loginTime: Date } | null>(
    null,
  );
  const [posts, setPosts] = useState<any[]>([]); // Adjust type according to your posts structure
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
   const fetchPosts = async () => {
     try {
       const response = await fetch(
         `${process.env.REACT_APP_BACKEND_SERVER_URL}/posts`,
       );
       console.log("Response Status:", response.status); // Log status code
       if (!response.ok) {
         throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched Data:", data); // Log fetched data
        setPosts(data);
     } catch (error) {
       setError(
         error instanceof Error ? error.message : "An unknown error occurred",
       );
     } finally {
       setLoading(false);
     }
   };
    
    fetchPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser, posts, loading, error }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
