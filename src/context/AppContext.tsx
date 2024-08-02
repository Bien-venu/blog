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
    null
  );
  const [posts, setPosts] = useState<any[]>([]); // Adjust type according to your posts structure
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/posts`,
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        // Assert that error is of type Error
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
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
