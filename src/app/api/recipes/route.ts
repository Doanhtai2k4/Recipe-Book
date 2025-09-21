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
    
    return NextResponse.json(recipes);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const dataSource = await getDataSource();
    const recipeRepository = dataSource.getRepository(Recipe);
    
    const { title, ingredients, instructions } = await request.json();
    
    const recipe = recipeRepository.create({
      title,
      ingredients,
      instructions
    });
    
    const savedRecipe = await recipeRepository.save(recipe);
    return NextResponse.json(savedRecipe, { status: 201 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Failed to create recipe" }, { status: 500 });
  }
}