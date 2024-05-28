import { Request, Response } from "express";
import jwt from "jsonwebtoken";

// This is just a placeholder for user data.
const users: { [key: string]: { password: string } } = {
  user1: { password: "password123" },
};

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (users[username] && users[username].password === password) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    return res.json({ token });
  }

  return res.status(401).json({ message: "Invalid credentials" });
};

export const signup = (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (users[username]) {
    return res.status(400).json({ message: "User already exists" });
  }

  users[username] = { password };
  return res.status(201).json({ message: "User created" });
};
