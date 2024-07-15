// routes/user.ts

import { Request, Response } from 'express';
import { comparePasswords } from '../models/user';
import { generateToken } from '../auth/auth';
import userModel from '../models/user';


export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await userModel.findByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log({digest: user.passwordDigest});
    

    const isMatch = await comparePasswords(password, user.passwordDigest);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}