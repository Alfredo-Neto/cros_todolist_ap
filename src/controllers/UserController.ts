import { Request, Response } from "express";
import { ZodError } from "zod";
import UserSchema from "../schemas/user";
import { User } from "@prisma/client";
import userService from "../services/user";

export async function create(req: Request, res: Response) {
  try {
    const userData: User = req.body;

    const validUser = UserSchema.parse(userData);

    let userResponse;
    if (validUser) {
      userResponse = await userService.create(userData);
      if (userResponse.statusCode == 400) {
        return res.status(400).json({ message: "Bad request." });
      }

      if (userResponse.statusCode == 201) {
        return res
          .status(201)
          .json({ message: "User successfully created", user: userResponse });
      }

      return res
        .status(userResponse.statusCode)
        .json({ message: "Something went wrong", user: userResponse });
    }
  } catch (error) {
    console.log("Error: ", { error });
    if (error instanceof ZodError) {
      res.status(400).json({ error: "Invalid data", details: error.errors });
    }
  }
}
