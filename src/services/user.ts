import userModel, { hashPassword } from '../models/user'
import { UserData } from "../interfaces/UserData";

const create = async (userData: UserData) => {
	const userExists = await userModel.findByEmail(userData.email);

	if (userExists) {
		return { statusCode: 400, message: "Email is already taken" };
	}
	
	const excludePassword = (user: UserData) => {
		const { password, ...userWithoutPassword } = user;
		return userWithoutPassword;
	}

	const excludePasswordDigest = (user: UserData) => {
		const { passwordDigest, ...userWithoutPasswordDigest } = user;
		return userWithoutPasswordDigest;
	}

	if (!userData.password) {
		return { statusCode: 400, message: "Bad request" };
	}

	const passwordDigest = await hashPassword(userData.password);

	const userDataToSave = excludePassword(userData);
	userDataToSave.passwordDigest = passwordDigest;

	const user = await userModel.create(userDataToSave as any);

	return { statusCode: 201, message: "User created successfully", user: excludePasswordDigest(user) };
}

export default {
	create
}