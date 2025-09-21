"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Recipe {
  id: number;
  title: string;
  ingredients: string; // Đổi từ string[] thành string
  instructions: string;
}

export default function EditRecipe({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchRecipe();
  }, []);

  const fetchRecipe = async () => {
    try {
      const response = await fetch(`/api/recipes/${resolvedParams.id}`);
      const data = await response.json();
      
      if (response.ok) {
        setRecipe(data);
        setTitle(data.title);
        setIngredients(data.ingredients);
        setInstructions(data.instructions);
      } else {
        alert("Recipe not found");
        router.push("/");
      }
    } catch (error) {
      console.error("Error fetching recipe:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/recipes/${resolvedParams.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          ingredients: ingredients.trim(),
          instructions,
        }),
      });

      if (response.ok) {
        router.push("/");
      } else {
        alert("Failed to update recipe");
      }
    } catch (error) {
      console.error("Error updating recipe:", error);
      alert("Error updating recipe");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/" className="text-blue-500 hover:underline">
          ← Back to Recipes
        </Link>
        <h1 className="text-3xl font-bold">Edit Recipe</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Recipe Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="ingredients" className="block text-sm font-medium mb-2">
            Ingredients (separate with commas)
          </label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
            rows={3}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="instructions" className="block text-sm font-medium mb-2">
            Instructions
          </label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
            rows={6}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {saving ? "Updating..." : "Update Recipe"}
        </button>
      </form>
    </div>
  );
}