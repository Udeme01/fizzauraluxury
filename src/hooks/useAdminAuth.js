// hooks/useAdminAuth.js
import { useState, useEffect } from "react";

const useAdminAuth = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Placeholder — pretend to check a session
    const timer = setTimeout(() => {
      setIsAdmin(true); // ← flip to false to preview the login redirect
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return { isAdmin, loading };
};

export default useAdminAuth;
