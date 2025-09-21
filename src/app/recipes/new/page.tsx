"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewRecipe() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Submitting recipe...");
      
      const recipeData = {
        title,
        ingredients: ingredients.trim(),
        instructions,
      };
      
      console.log("Recipe data:", recipeData);

      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });

      console.log("Response status:", response.status);
      
      const result = await response.json();
      console.log("Response data:", result);

      if (response.ok) {
        alert("Recipe created successfully!");
        router.push("/");
      } else {
        alert(`Failed to create recipe: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error creating recipe:", error);
      alert("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/" className="text-blue-500 hover:underline">
          ← Back to Recipes
        </Link>
        <h1 className="text-3xl font-bold">Add New Recipe</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Recipe Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
            placeholder="Enter recipe title"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="ingredients" className="block text-sm font-medium mb-2">
            Ingredients (separate with commas) *
          </label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
            rows={3}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g., 2 cups flour, 1 egg, 1 cup milk"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="instructions" className="block text-sm font-medium mb-2">
            Instructions *
          </label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
            rows={6}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter cooking instructions step by step"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Recipe"}
        </button>
      </form>
    </div>
  );
}