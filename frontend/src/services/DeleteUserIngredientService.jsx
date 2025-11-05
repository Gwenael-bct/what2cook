/**
 * Service pour supprimer un ingrédient à l'inventaire de l'utilisateur
 * @param {number} ingredientId - ID de l'ingrédient à ajouter
 * @returns {Promise<Object>} Résultat de l'ajout
 */
export async function deleteUserIngredient(ingredientId) {
  try {
    // Essayer d'abord avec le proxy
    let apiUrl = '/user-ingredients/delete-ingredient';
    let res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        ingredientId,
      }),
    });

    // Si le proxy ne fonctionne pas (404), essayer avec l'URL complète
    if (!res.ok && res.status === 404) {
      apiUrl = 'http://localhost:5000/user-ingredients/delete-ingredient';
      res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ingredientId,
        }),
      });
    }

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || `Erreur ${res.status}: ${res.statusText}`);
    }

    return {
      success: true,
      data,
      message: data.message || 'Ingrédient supprimé avec succès',
    };
  } catch (error) {
    console.error('Erreur lors de la supression de l\'ingrédient:', error);
    return {
      success: false,
      error: error.message || 'Erreur lors de la supression de l\'ingrédient',
    };
  }
}
