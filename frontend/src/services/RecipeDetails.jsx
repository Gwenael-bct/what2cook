let recipeDetailsCache = [];

export const RecipeDetailsService = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/recipes/details/${id}`);

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des recettes');
    }

    const data = await response.json();
    recipeDetailsCache = data || [];
  } catch (error) {
    recipeDetailsCache = [];
  }
};

export function getRecipeDetailsCache() {
  return recipeDetailsCache;
}