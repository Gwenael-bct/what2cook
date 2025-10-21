import React from 'react';
import GoogleLogin from "../components/GoogleSignIn";
import { useCallback } from "react";

export default function ReloadUser({ onUserLoaded, colorButton }) {
// Fonction pour recharger les infos utilisateur (après login/logout)
  const reloadUser = useCallback(() => {
    fetch("http://localhost:5000/api/auth/me", {
      method: "GET",
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => onUserLoaded(data.user))
      .catch(() => onUserLoaded(null));
  }, [onUserLoaded]);

  return (
    <GoogleLogin onLoginSuccess={reloadUser} onLogoutSuccess={reloadUser} colorButton={colorButton} />
  );
}