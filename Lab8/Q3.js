(async () => {
    try {
        const response = await fetch('https://dummyjson.com/recipes');
        const data = await response.json();
        const recipeNames = data.recipes.map(recipe => recipe.name);
        console.log('Recipe Names:');
        recipeNames.forEach(name => console.log(name));
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
})(); 