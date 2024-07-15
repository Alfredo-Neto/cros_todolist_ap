import userModel from '../models/user'
import { UserData } from '../interfaces/UserData'

const create = async (userData: UserData) => {
	const userExists = await userModel.findByEmail(userData.email);

	if (userExists) {
		return { statusCode: 400, message: "Email is already taken" };
	}

	const user = await userModel.create(userData);

	const excludePassword = (user: UserData) => {
		const { password, ...userWithoutPassword } = user;
		return userWithoutPassword;
	}

	return { statusCode: 201, message: "User created successfully", user: excludePassword(user) };
}

export default {
	create
}