export async function searchIngredients(query, lang = 'fr') {
  if (!query) return [];

  try {
    // Essayer d'abord avec le proxy
    let apiUrl = `/api/ingredients?q=${encodeURIComponent(query)}&lang=${lang}`;
    let res = await fetch(apiUrl, { credentials: 'include' });

    // Si le proxy ne fonctionne pas (404), essayer avec l'URL complète
    if (!res.ok && res.status === 404) {
      apiUrl = `http://localhost:5000/ingredients/search?q=${encodeURIComponent(query)}&lang=${lang}`;
      res = await fetch(apiUrl, { credentials: 'include' });
    }

    if (!res.ok) {
      let errorData;
      try {
        errorData = await res.json();
      } catch {
        errorData = { error: res.statusText || 'Erreur inconnue' };
      }
      throw new Error(errorData.error || 'Erreur lors de la recherche');
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('Erreur recherche ingrédient:', err);
    throw err;
  }
}
