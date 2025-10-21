let recipesCache = []; // variable pour stocker le résultat

export const RecipesByMainIngredient = async (ingredient) => {
  try {
    const response = await fetch(`http://localhost:5000/recettes/by-main-ingredient/${ingredient}`);

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des recettes');
    }

    const data = await response.json();
    recipesCache = data || [];
    console.log('Recettes récupérées:', recipesCache);
  } catch (error) {
    console.error('Erreur:', error);
    recipesCache = [];
  }
};

export function getRecipesCache() {
  return recipesCache;
}