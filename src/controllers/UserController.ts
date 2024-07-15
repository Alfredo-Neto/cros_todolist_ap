import { Request, Response } from 'express';
import { ZodError } from "zod";
import UserSchema from '../schemas/user';
import { UserData } from '../interfaces/UserData'
import userService from '../services/user';

export async function create(req: Request, res: Response) {
	try {
    const userData: UserData = req.body;

    const validUser = UserSchema.parse(userData);

		let userResponse;
		if (validUser) {
			userResponse = await userService.create(userData);
			if (userResponse.statusCode == 201) {
				return res.status(201).json({ message: 'User successfully created', user: userResponse });
			}
			return res.status(userResponse.statusCode).json({ message: 'Something went wrong', user: userResponse });
		}
  } catch (error) {
		console.log("Error: ", {
			error
		})
		if (error instanceof ZodError) {
			res.status(400).json({ error: 'Invalid data', details: error.errors });
		}
  }
}