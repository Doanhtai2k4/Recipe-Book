"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Recipe {
  id: number;
  title: string;
  ingredients: string;
  instructions: string;
  created_at: string;
}

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Tránh hydration error
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      fetchRecipes();
    }
  }, [isMounted]);

  const fetchRecipes = async (ingredient?: string) => {
    try {
      const url = ingredient 
        ? `/api/recipes?ingredient=${encodeURIComponent(ingredient)}`
        : "/api/recipes";
      const response = await fetch(url);
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRecipes(searchTerm);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this recipe?")) {
      try {
        await fetch(`/api/recipes/${id}`, { method: "DELETE" });
        fetchRecipes();
      } catch (error) {
        console.error("Error deleting recipe:", error);
      }
    }
  };

  // Tránh hydration error - không render gì cho tới khi mounted
  if (!isMounted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">Loading...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">Loading recipes...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Recipe Book</h1>
        <Link 
          href="/recipes/new" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Recipe
        </Link>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by ingredient..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border rounded px-3 py-2"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              fetchRecipes();
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Clear
          </button>
        </div>
      </form>

      {/* Recipe List */}
      <div className="grid gap-6">
        {recipes.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No recipes found.</p>
        ) : (
          recipes.map((recipe) => (
            <div key={recipe.id} className="border rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold">{recipe.title}</h2>
                <div className="flex gap-2">
                  <Link
                    href={`/recipes/${recipe.id}/edit`}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(recipe.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-gray-600 mb-2">
                <strong>Ingredients:</strong> {recipe.ingredients}
              </p>
              <p className="text-gray-700">
                <strong>Instructions:</strong> {recipe.instructions}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}