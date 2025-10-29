"use client";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { FiClock } from "react-icons/fi";
import { X } from "lucide-react";

export default function SearchByIngredient({ searchQuery }) {
  const [input, setInput] = useState("");
  const [meals, setMeals] = useState([]);
  const [randomMeal, setRandomMeal] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [randomIngredients, setRandomIngredients] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const allIngredients = [
    "Chicken",
    "Beef",
    "Pasta",
    "Rice",
    "Tomato",
    "Garlic",
    "Cheese",
    "Potato",
    "Egg",
    "Mushroom",
    "Onion",
    "Carrot",
    "Pepper",
    "Spinach",
    "Lemon",
    "Honey",
    "Milk",
    "Butter",
    "Banana",
    "Chocolate",
    "Chili",
    "Curry",
    "Fish",
    "Bread"
  ];

  // Initial data: recipe of the day, default meals, random badges
  useEffect(() => {
    fetchRecipeOfTheDay();
    fetchDefaultMeals();
    generateRandomIngredients();
  }, []);

  // Trigger search when user types in navbar search
  useEffect(() => {
    if (searchQuery && searchQuery.trim() !== "") {
      setInput(searchQuery);
      setTimeout(() => handleSearch(searchQuery), 200);
    }
  }, [searchQuery]);

  const generateRandomIngredients = () => {
    const shuffled = [...allIngredients].sort(() => 0.5 - Math.random());
    setRandomIngredients(shuffled.slice(0, 10));
  };

  // Fetch "Recipe of the Day"
  const fetchRecipeOfTheDay = async () => {
    try {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const data = await res.json();
      setRandomMeal(data.meals ? data.meals[0] : null);
    } catch (err) {
      console.error("Failed to fetch recipe of the day", err);
    }
  };

  // Default recipes (when no search yet)
  const fetchDefaultMeals = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken"
      );
      const data = await res.json();
      setMeals(data.meals || []);
    } catch {
      setError("Failed to load default recipes.");
    } finally {
      setLoading(false);
    }
  };

  // Search recipes based on ingredients entered
  const handleSearch = async (customInput = input) => {
    const ingredients = customInput
      .split(",")
      .map((i) => i.trim().toLowerCase())
      .filter(Boolean);

    if (ingredients.length === 0) {
      setError("Please enter at least one ingredient.");
      return;
    }

    setLoading(true);
    setError(null);
    setMeals([]);

    try {
      const results = await Promise.all(
        ingredients.map((ingredient) =>
          fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
          )
            .then((res) => res.json())
            .then((data) => data.meals || [])
        )
      );

      // Show only meals common to all ingredients
      const commonMeals = results.reduce(
        (acc, current) =>
          acc.length === 0
            ? current
            : acc.filter((a) => current.some((b) => a.idMeal === b.idMeal)),
        []
      );

      if (commonMeals.length > 0) {
        setMeals(commonMeals);
      } else {
        setError(
          "No recipes found for all those ingredients. Showing defaults..."
        );
        fetchDefaultMeals();
      }
    } catch {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch meal details when clicked
  const handleMealClick = async (mealId) => {
    try {
      setLoadingDetail(true);
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );
      const data = await res.json();
      setSelectedMeal(data.meals ? data.meals[0] : null);
    } catch (err) {
      console.error("Failed to fetch meal details", err);
    } finally {
      setLoadingDetail(false);
    }
  };

  const closeModal = () => setSelectedMeal(null);

  return (
    <section id="search" className="bg-[#fcfbf4] py-16 px-6 md:px-20 relative">
      <div className="max-w-5xl mx-auto text-center">
        {/* Recipe of the Day */}
        {randomMeal && (
          <div className="mb-12 rounded-2xl shadow-md overflow-hidden">
            <img
              src={randomMeal.strMealThumb}
              alt={randomMeal.strMeal}
              className="w-full h-72 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-[#cf6c50] mb-2">
                🍴 Recipe of the Day: {randomMeal.strMeal}
              </h2>
              <p className="text-gray-700">
                Category:{" "}
                <span className="font-medium">{randomMeal.strCategory}</span> |
                Area: <span className="font-medium">{randomMeal.strArea}</span>
              </p>
            </div>
          </div>
        )}

        <h2 className="text-3xl md:text-5xl font-semibold text-[#cf6c50] mb-2">
          SEARCH BY INGREDIENT(s)
        </h2>
        <p className="text-gray-700 mb-8">
          Type or select ingredients and discover recipes using them all!
        </p>

        {/* Ingredient suggestion badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {randomIngredients.map((ingredient, index) => (
            <span
              key={index}
              onClick={() =>
                setInput((prev) =>
                  prev
                    ? `${prev}, ${ingredient.toLowerCase()}`
                    : ingredient.toLowerCase()
                )
              }
              className="cursor-pointer bg-[#f3e3db] text-[#cf6c50] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#cf6c50] hover:text-white transition"
            >
              {ingredient}
            </span>
          ))}
        </div>

        {/* Search input + button */}
        <div className="flex flex-wrap justify-center items-center gap-3 max-w-xl w-full mx-auto mb-8">
          <div className="flex items-center rounded-full px-4 py-2 flex-grow shadow-sm bg-white">
            <Search className="text-[#cf6c50] w-5 h-5 mr-2" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="e.g., chicken, rice, tomato"
              className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500"
            />
          </div>
          <button
            onClick={() => handleSearch()}
            className="bg-[#cf6c50] text-white px-5 py-2 rounded-full hover:bg-[#b6593d] transition"
          >
            Search
          </button>
        </div>

        {/* Error & Loading states */}
        {loading && <p className="text-gray-600 mb-6">Loading recipes...</p>}
        {error && (
          <p className="text-red-600 mb-6 text-xl font-semibold">{error}</p>
        )}

        {!error && !loading && input && (
          <div className="my-5 text-xl font-semibold text-red-400">
            Showing results for <span className="text-[#cf6c50]">{input}</span>
          </div>
        )}

        {/* Results grid */}
        <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2">
          {meals.map((meal) => (
            <div
              key={meal.idMeal}
              onClick={() => handleMealClick(meal.idMeal)}
              className="bg-white p-3 rounded-xl shadow-md overflow-hidden hover:shadow-lg cursor-pointer transition"
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-48 object-cover rounded-lg transition-transform duration-200 hover:scale-105"
              />
              <div className="p-4 flex gap-2 justify-between text-[#cf6c50]">
                <h3 className="text-lg font-medium text-gray-800">
                  {meal.strMeal}
                </h3>
                <p className="flex items-center gap-1 font-semibold">
                  <FiClock /> {Math.floor(Math.random() * 25) + 30} min
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recipe Modal */}
      {selectedMeal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4">
          <div className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden relative">
            <button
              onClick={closeModal}
              className="absolute text-gray-600 hover:text-red-500 transition"
            >
              <X size={24} />
            </button>

            {loadingDetail ? (
              <div className="p-8 text-center text-gray-700 text-lg">
                Loading details...
              </div>
            ) : (
              <div>
                
                <div className="p-6 text-left">
                  <h2 className="text-2xl font-bold text-[#cf6c50] mb-2">
                    {selectedMeal.strMeal}
                  </h2>
                  <p className="text-gray-600 mb-2">
                    <strong>Category:</strong> {selectedMeal.strCategory} |{" "}
                    <strong>Area:</strong> {selectedMeal.strArea}
                  </p>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {selectedMeal.strInstructions.slice(0, 300)}...
                  </p>

                  <h3 className="text-lg font-semibold text-[#cf6c50] mb-2">
                    Ingredients:
                  </h3>
                  <ul className="grid grid-cols-2 text-sm gap-2 text-gray-700">
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => {
                      const ingredient = selectedMeal[`strIngredient${num}`];
                      const measure = selectedMeal[`strMeasure${num}`];
                      return (
                        ingredient &&
                        measure && (
                          <li key={num}>
                            • {ingredient} - {measure}
                          </li>
                        )
                      );
                    })}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
