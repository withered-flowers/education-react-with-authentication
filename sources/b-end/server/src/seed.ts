import Database from "bun:sqlite";
import { faker } from "@faker-js/faker";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { Product, User } from "./schema";
import { hashPlaintext } from "./utils";

const client = new Database("./database/sqlite.db");
const db = drizzle(client);

const NUM_OF_USERS = 10;
const NUM_OF_PRODUCTS = 100;

const arrUsers: (typeof User.$inferInsert)[] = [];
const arrProducts: (typeof Product.$inferInsert)[] = [];

arrUsers.push(
	{
		name: "admin",
		email: "admin@mail.com",
		password: hashPlaintext("123456"),
		role: "admin",
		createdAt: faker.date.recent().toDateString(),
		updatedAt: faker.date.recent().toDateString(),
	},
	{
		name: "customer",
		email: "customer@mail.com",
		password: hashPlaintext("123456"),
		role: "customer",
		createdAt: faker.date.recent().toDateString(),
		updatedAt: faker.date.recent().toDateString(),
	},
);

for (let i = 0; i < NUM_OF_USERS; i++) {
	arrUsers.push({
		name: faker.person.fullName(),
		email: faker.internet.email().toLocaleLowerCase(),
		password: hashPlaintext("123456"),
		role: Math.random() > 0.5 ? "admin" : "customer",
		createdAt: faker.date.recent().toDateString(),
		updatedAt: faker.date.recent().toDateString(),
	});
}

for (let i = 0; i < NUM_OF_PRODUCTS; i++) {
	arrProducts.push({
		name: faker.commerce.productName(),
		price: Number(faker.commerce.price()),
		authorId: Math.floor(Math.random() * NUM_OF_USERS) + 1,
		createdAt: faker.date.recent().toDateString(),
		updatedAt: faker.date.recent().toDateString(),
	});
}

await db.insert(User).values(arrUsers);
await db.insert(Product).values(arrProducts);

console.log("Data has been inserted successfully!");
