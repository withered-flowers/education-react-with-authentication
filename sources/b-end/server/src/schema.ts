import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const User = sqliteTable("Users", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	email: text("email").notNull(),
	password: text("password").notNull(),
	role: text("role").$type<"admin" | "customer">().notNull(),
	createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});

export const Product = sqliteTable("Products", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	price: integer("price").notNull(),
	authorId: integer("authorId")
		.references(() => User.id)
		.notNull(),
	createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
	updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});
