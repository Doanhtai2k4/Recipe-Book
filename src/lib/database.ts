import "reflect-metadata";
import { DataSource } from "typeorm";
import { Recipe } from "@/entity/Recipe";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "123456", // Thay bằng password MySQL của bạn
  database: "recipe_book",
  synchronize: true, // Chỉ dùng trong development
  logging: true, // Bật logging để debug
  entities: [Recipe],
});

let isInitialized = false;

export const getDataSource = async () => {
  if (!isInitialized) {
    try {
      await AppDataSource.initialize();
      isInitialized = true;
      console.log("✅ Database connected successfully!");
    } catch (error) {
      console.error("❌ Database connection failed:", error);
      throw error;
    }
  }
  return AppDataSource;
};