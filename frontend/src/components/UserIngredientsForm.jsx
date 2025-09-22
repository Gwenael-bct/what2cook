// frontend/src/components/UserIngredientsForm.jsx
import { useState } from 'react';

export default function UserIngredientsForm() {
  const [ingredients, setIngredients] = useState([{ ingredient_id: '', quantity: '' }]);

  const handleChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { ingredient_id: '', quantity: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/user-ingredients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients }),
    });
    const data = await res.json();
    alert(data.message || 'Done!');
  };

  return (
      <form onSubmit={handleSubmit}>
        {ingredients.map((ing, i) => (
            <div key={i}>
              <input
                  type="number"
                  placeholder="ID ingrédient"
                  value={ing.ingredient_id}
                  onChange={e => handleChange(i, 'ingredient_id', e.target.value)}
              />
              <input
                  type="text"
                  placeholder="Quantité"
                  value={ing.quantity}
                  onChange={e => handleChange(i, 'quantity', e.target.value)}
              />
            </div>
        ))}
        <button type="button" onClick={addIngredient}>Ajouter un ingrédient</button>
        <button type="submit">Envoyer</button>
      </form>
  );
}
