import { NextRequest, NextResponse } from "next/server";
import { getDataSource } from "@/lib/database";
import { Recipe } from "@/entity/Recipe";
import { Like } from "typeorm";

export async function GET(request: NextRequest) {
  try {
    const dataSource = await getDataSource();
    const recipeRepository = dataSource.getRepository(Recipe);
    
    const { searchParams } = new URL(request.url);
    const ingredient = searchParams.get("ingredient");
    
    let recipes;
    if (ingredient) {
      recipes = await recipeRepository.find({
        where: {
          ingredients: Like(`%${ingredient}%`)
        }
      });
    } else {
      recipes = await recipeRepository.find({
        order: { created_at: "DESC" }
      });
    }
    
    // Parse ingredients từ JSON string thành array
    const processedRecipes = recipes.map(recipe => ({
      ...recipe,
      ingredients: JSON.parse(recipe.ingredients)
    }));
    
    return NextResponse.json(processedRecipes);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("Creating new recipe...");
    
    const dataSource = await getDataSource();
    const recipeRepository = dataSource.getRepository(Recipe);
    
    const body = await request.json();
    console.log("Request body:", body);
    
    const { title, ingredients, instructions } = body;
    
    // Validate required fields
    if (!title || !ingredients || !instructions) {
      return NextResponse.json({ 
        error: "Missing required fields" 
      }, { status: 400 });
    }
    
    const recipe = recipeRepository.create({
      title,
      ingredients: JSON.stringify(ingredients), // Chuyển array thành JSON string
      instructions
    });
    
    console.log("Recipe to save:", recipe);
    
    const savedRecipe = await recipeRepository.save(recipe);
    console.log("Recipe saved successfully:", savedRecipe);
    
    return NextResponse.json({
      ...savedRecipe,
      ingredients: JSON.parse(savedRecipe.ingredients)
    }, { status: 201 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ 
      error: "Failed to create recipe",
      details: typeof error === "object" && error !== null && "message" in error ? (error as { message: string }).message : String(error)
    }, { status: 500 });
  }
}