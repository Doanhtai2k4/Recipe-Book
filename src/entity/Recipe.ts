import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity({ name: "recipes" })
export class Recipe {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  title!: string;

  @Column({ type: "text", nullable: false })
  ingredients!: string;

  @Column({ type: "text", nullable: false })
  instructions!: string;

  @CreateDateColumn({ name: "created_at" })
  created_at!: Date;
}