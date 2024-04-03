import cors from "cors";
import { eq } from "drizzle-orm";
import express from "express";
import { JWTExpired } from "jose/errors";
import { db } from "./configs/sqlite";
import { Product, User } from "./schema";
import {
  type JwtPayload,
  comparePlaintextWithHash,
  readToken,
  signPayload,
} from "./utils";

interface CustomRequest extends express.Request {
  users: {
    id: number;
  };
}

interface ErrorResponse {
  statusCode: number;
  message: string;
}

const app = express();
const port = process.env.port || 3000;

app

  // Middleware
  .use(cors())
  .use(express.urlencoded({ extended: false }))
  .use(express.json())

  // GET /
  .get("/", (req, res) => {
    res.status(200).json({
      statusCode: 200,
      message: "Hello World !",
    });
  })

  // GET /products
  .get("/products", (req, res, next) => {
    const products = db.select().from(Product).all();

    res.status(200).json({
      statusCode: 200,
      data: products,
    });
  })

  // POST /login
  .post("/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const foundUser = await db.query.User.findFirst({
        where: eq(User.email, email),
      });

      if (
        !foundUser ||
        !comparePlaintextWithHash(password, foundUser.password ?? "")
      ) {
        throw new Error("INVALID_CREDENTIALS");
      }

      const token = await signPayload({ id: foundUser.id });

      res.status(200).json({
        statusCode: 200,
        data: {
          token,
        },
      });
    } catch (err) {
      next(err);
    }
  })

  // Middleware Authentication
  .use(async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Error("INVALID_TOKEN");
    }

    const token = (
      Array.isArray(authorization) ? authorization[0] : authorization
    ).split("Bearer ")[1];

    if (!token) {
      throw new Error("INVALID_TOKEN");
    }

    try {
      const authData = await readToken<JwtPayload>(token);

      (req as CustomRequest).users = {
        id: authData.payload.id,
      };

      next();
    } catch (err) {
      next(err);
    }
  })

  // POST /products
  .post("/products", async (req, res, next) => {
    try {
      const { name, price } = req.body;
      const userId = (req as CustomRequest).users.id;

      const newProduct: typeof Product.$inferInsert = {
        name,
        price,
        authorId: userId,
      };

      const insertedProduct = await db
        .insert(Product)
        .values(newProduct)
        .returning();

      res.status(201).json({
        statusCode: 201,
        data: insertedProduct,
      });
    } catch (err) {
      next(err);
    }
  })

  // Error Handler
  .use(
    (
      err: Error,
      req: express.Request,
      res: express.Response<ErrorResponse>,
      next: express.NextFunction
    ) => {
      let statusCode = 500;
      let message = "Internal Server Error";

      console.log(err);

      if (err instanceof JWTExpired) {
        statusCode = 401;
        message = "Token expired";
      } else if (err instanceof Error) {
        if (err.message === "INVALID_CREDENTIALS") {
          statusCode = 401;
          message = "Invalid username / password";
        } else if (err.message === "INVALID_TOKEN") {
          statusCode = 401;
          message = "Invalid token";
        }
      }

      res.status(statusCode).json({
        statusCode,
        message,
      });
    }
  )

  // Listen
  .listen(port, () => console.log(`Server is running on port ${port}!`));
