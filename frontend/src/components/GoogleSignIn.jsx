import React, { useState, useEffect } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function GoogleSignIn() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Vérifier la session existante côté backend
    const fetchMe = async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (e) {
        // ignore
      }
    };
    fetchMe();
  }, []);

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ credential: credentialResponse.credential })
      });
      setUser({ name: decoded.name, email: decoded.email, picture: decoded.picture });
    } catch (e) {
      console.log("Échec de la connexion", e);
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } catch (e) {}
    googleLogout();
    setUser(null);
  };

  return (
      <div>
        {!user ? (
            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => console.log("Échec de la connexion")}
            />
        ) : (
            <div>
              <button onClick={handleLogout}
                      className="rounded-full bg-white/10 hover:bg-orange-500 m-4 p-4 font-medium"
              >
                Se déconnecter
              </button>
            </div>
        )}
      </div>
  );
}
