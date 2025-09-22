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
                onSuccess={async (credentialResponse) => {
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
                }}
                onError={() => console.log("Échec de la connexion")}
            />
        ) : (
            <div>
              <p>Bienvenue {user.username || user.name}</p>
              <button onClick={handleLogout}>Se déconnecter</button>
            </div>
        )}
      </div>
  );
}
