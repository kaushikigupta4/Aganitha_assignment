"use client";
import React, { useEffect, useState } from "react";

export default function QuickMealsSection() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    // Fetch meals that are quick
    const fetchQuickMeals = async () => {
      try {
        const res = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood");
        const data = await res.json();
        // Randomly pick 6 meals as “quick”
        const randomMeals = data.meals.sort(() => 0.5 - Math.random()).slice(0, 6);
        setMeals(randomMeals);
      } catch (error) {
        console.error("Error fetching quick meals:", error);
      }
    };

    fetchQuickMeals();
  }, []);

  return (
    <section id="quickmeals" className="bg-[#fcfbf4] py-16 px-6 md:px-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-[#cf6c50] mb-2">Quick Meals 🍳</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Short on time? Try these quick and easy recipes that get dinner on the table fast.
        </p>
      </div>

      {/* --- Meals Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {meals.map((meal) => (
          <div
            key={meal.idMeal}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer"
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{meal.strMeal}</h3>
              <p className="text-sm text-gray-500 mt-1">Ready in ~30 mins</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
