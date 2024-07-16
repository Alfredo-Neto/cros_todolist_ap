import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import userModel from "../models/user";
import { User } from "@prisma/client";

interface DecodedPayload extends JwtPayload {
  email: string;
}

export interface CustomRequest extends Request {
  user?: User;
}

const secret = process.env.JWT_SECRET as string;

export const generateToken = (user: User): string => {
  const payload = {
    id: user.id,
    email: user.email,
  };

  return jwt.sign(payload, secret, { expiresIn: "1h" });
};

export const verifyToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Missing auth token" });
  }

  try {
    const verified = jwt.verify(token, secret) as DecodedPayload;
    const user = await userModel.findByEmail(verified.email);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid token", error: "unauthorized" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Authentication error:", err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
