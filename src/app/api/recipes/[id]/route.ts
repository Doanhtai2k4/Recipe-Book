import { NextRequest, NextResponse } from "next/server";
import { getDataSource } from "@/lib/database";
import { Recipe } from "@/entity/Recipe";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const dataSource = await getDataSource();
    const recipeRepository = dataSource.getRepository(Recipe);
    
    const recipe = await recipeRepository.findOne({
      where: { id: parseInt(resolvedParams.id) }
    });
    
    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }
    
    return NextResponse.json(recipe);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch recipe" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const dataSource = await getDataSource();
    const recipeRepository = dataSource.getRepository(Recipe);
    
    const { title, ingredients, instructions } = await request.json();
    
    const recipe = await recipeRepository.findOne({
      where: { id: parseInt(resolvedParams.id) }
    });
    
    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }
    
    recipe.title = title;
    recipe.ingredients = ingredients;
    recipe.instructions = instructions;
    
    const updatedRecipe = await recipeRepository.save(recipe);
    return NextResponse.json(updatedRecipe);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update recipe" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const dataSource = await getDataSource();
    const recipeRepository = dataSource.getRepository(Recipe);
    
    const result = await recipeRepository.delete(parseInt(resolvedParams.id));
    
    if (result.affected === 0) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }
    
    return NextResponse.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete recipe" }, { status: 500 });
  }
}