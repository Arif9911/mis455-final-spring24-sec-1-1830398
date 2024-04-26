document.getElementById('search-btn').addEventListener('click', function() {
    const searchText = document.getElementById('search-input').value;
    fetchMeals(searchText);
});

function fetchMeals(searchText) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayMeals(data.meals))
        .catch(error => console.error('Error:', error));
}

function displayMeals(meals) {
    const container = document.getElementById('meals-container');
    container.innerHTML = ""; // Clear previous results
    if (!meals) {
        container.innerHTML = '<p>No meals found.</p>';
        return;
    }

    meals.slice(0, 5).forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.className = 'meal';
        mealDiv.innerHTML = `
            <h3>${meal.strMeal}</h3>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width:100%;">
            <p><strong>ID:</strong> ${meal.idMeal}</p>
            <p><strong>Title:</strong> ${meal.strMeal}</p>
            <p>${meal.strInstructions.substring(0, 100)}...</p>
        `;
        container.appendChild(mealDiv);
    });

    if (meals.length > 5) {
        const showAllButton = document.createElement('button');
        showAllButton.textContent = 'SHOW ALL';
        showAllButton.addEventListener('click', () => {
            displayAllMeals(meals);
        });
        showAllButton.classList.add('showAll');
        container.appendChild(showAllButton);
    }
}

function displayAllMeals(meals) {
    const container = document.getElementById('meals-container');
    container.innerHTML = ""; // Clear previous content
    meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.className = 'meal';
        mealDiv.innerHTML = `
            <h3>${meal.strMeal}</h3>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width:100%;">
            <p><strong>ID:</strong> ${meal.idMeal}</p>
            <p><strong>Title:</strong> ${meal.strMeal}</p>
            <p>${meal.strInstructions}</p>
        `;
        container.appendChild(mealDiv);
    });
}
