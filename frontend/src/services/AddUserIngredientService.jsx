/**
 * Service pour ajouter un ingrédient à l'inventaire de l'utilisateur
 * @param {number} ingredientId - ID de l'ingrédient à ajouter
 * @param {number} quantity - Quantité (optionnel, défaut: 1)
 * @returns {Promise<Object>} Résultat de l'ajout
 */
export async function addUserIngredient(ingredientId, quantity = 1) {
  try {
    // Essayer d'abord avec le proxy
    let apiUrl = '/user-ingredients/add-ingredient';
    let res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        ingredientId,
        quantity,
      }),
    });

    // Si le proxy ne fonctionne pas (404), essayer avec l'URL complète
    if (!res.ok && res.status === 404) {
      apiUrl = 'http://localhost:5000/user-ingredients/add-ingredient';
      res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ingredientId,
          quantity,
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
      message: data.message || 'Ingrédient ajouté avec succès',
    };
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'ingrédient:', error);
    return {
      success: false,
      error: error.message || 'Erreur lors de l\'ajout de l\'ingrédient',
    };
  }
}
