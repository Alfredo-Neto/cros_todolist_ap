import { Request, Response, NextFunction } from "express";

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("Error: ", err.stack);
  res.status(500).json({
    error: "Internal server error",
  });
}
