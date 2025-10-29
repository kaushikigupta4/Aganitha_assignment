"use client";
import React, { useEffect, useState } from "react";

export default function RecipeModal({ mealId, onClose }) {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
        );
        const data = await res.json();
        setMeal(data.meals ? data.meals[0] : null);
      } catch (err) {
        console.error("Failed to load meal details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeal();
  }, [mealId]);

  if (!mealId) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-3">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-4 relative max-h-[85vh] overflow-y-auto text-sm">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold"
        >
          ✕
        </button>

        {loading ? (
          <p className="text-center text-gray-600 text-sm mt-8">
            Loading recipe...
          </p>
        ) : meal ? (
          <>
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="rounded-xl mb-3 w-full h-44 object-cover"
            />

            <h2 className="text-xl font-semibold text-[#cf6c50] mb-1">
              {meal.strMeal}
            </h2>
            <p className="text-gray-600 mb-3 text-xs">
              <span className="font-medium">{meal.strCategory}</span> •{" "}
              <span className="font-medium">{meal.strArea}</span>
            </p>

            {/* Ingredients */}
            <h3 className="text-[#cf6c50] font-semibold mb-1 text-base">
              Ingredients:
            </h3>
            <ul className="list-disc list-inside text-gray-700 mb-3 text-xs space-y-0.5">
              {Array.from({ length: 20 }).map((_, i) => {
                const ingredient = meal[`strIngredient${i + 1}`];
                const measure = meal[`strMeasure${i + 1}`];
                return (
                  ingredient && (
                    <li key={i}>
                      {ingredient} —{" "}
                      <span className="text-gray-500">{measure}</span>
                    </li>
                  )
                );
              })}
            </ul>

            {/* Instructions */}
            <h3 className="text-[#cf6c50] font-semibold mb-1 text-base">
              Instructions:
            </h3>
            <p className="text-gray-700 leading-relaxed text-xs whitespace-pre-line mb-3">
              {meal.strInstructions}
            </p>

            {meal.strYoutube && (
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#cf6c50] text-white px-3 py-1.5 rounded-lg hover:bg-[#b6593d] transition text-xs font-medium"
              >
                ▶ Watch Tutorial
              </a>
            )}
          </>
        ) : (
          <p className="text-center text-gray-600 text-sm mt-6">
            No details found.
          </p>
        )}
      </div>
    </div>
  );
}
