const express = require('express');
const router = express.Router();

router.get('/by-main-ingredient/:ingredient', async (req, res) => {
  const ingredient = req.params.ingredient;
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des données");
    }

    const data = await response.json();

    res.json(data.meals);
  } catch (error) {
    console.error("Erreur:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
