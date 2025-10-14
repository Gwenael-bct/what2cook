import { useEffect } from "react";

export default function CurrentUser({ onUserLoaded }) {
  useEffect(() => {
    fetch("http://localhost:5000/api/auth/me", {
      method: "GET",
      credentials: "include",
    })
        .then(res => res.json())
        .then(data => onUserLoaded(data.user))
        .catch(err => console.error(err));
  }, [onUserLoaded]);

  return null;
}
