import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { AuthResponse, User } from "@shared/auth";

// In-memory user storage (for demo - replace with MongoDB in production)
const users: Map<string, { id: string; name: string; email: string; password: string; role: "user" | "organizer" | "admin" }> = new Map();

const JWT_SECRET = process.env.JWT_SECRET || "casa-heritage-secret-key-change-in-production";

// Generate JWT token
const generateToken = (user: User): string => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "30d" }
  );
};

// Hash password (in production, use bcrypt)
const hashPassword = (password: string): string => {
  // Simple hash for demo - use bcrypt in production
  return Buffer.from(password).toString("base64");
};

// Verify password
const verifyPassword = (password: string, hash: string): boolean => {
  return hashPassword(password) === hash;
};

export const handleLogin: RequestHandler = (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email et mot de passe requis",
      } as AuthResponse);
    }

    // Find user by email
    let foundUser = null;
    for (const user of users.values()) {
      if (user.email === email) {
        foundUser = user;
        break;
      }
    }

    if (!foundUser || !verifyPassword(password, foundUser.password)) {
      return res.status(401).json({
        success: false,
        error: "Email ou mot de passe incorrect",
      } as AuthResponse);
    }

    // Generate token
    const user: User = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
    };

    const token = generateToken(user);

    res.json({
      success: true,
      token,
      user,
    } as AuthResponse);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      error: "Erreur serveur lors de la connexion",
    } as AuthResponse);
  }
};

export const handleSignup: RequestHandler = (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "Nom, email et mot de passe requis",
      } as AuthResponse);
    }

    // Check if user already exists
    for (const user of users.values()) {
      if (user.email === email) {
        return res.status(400).json({
          success: false,
          error: "Un compte avec cet email existe déjà",
        } as AuthResponse);
      }
    }

    // Create new user
    const userId = `user_${Date.now()}`;
    const newUser = {
      id: userId,
      name,
      email,
      password: hashPassword(password),
      role: "user" as const,
    };

    users.set(userId, newUser);

    // Generate token
    const user: User = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      token,
      user,
    } as AuthResponse);
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      error: "Erreur serveur lors de l'inscription",
    } as AuthResponse);
  }
};

export const handleVerifyToken: RequestHandler = (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Token manquant",
      } as AuthResponse);
    }

    const decoded = jwt.verify(token, JWT_SECRET) as User;

    res.json({
      success: true,
      user: decoded,
    } as AuthResponse);
  } catch (error) {
    res.status(401).json({
      success: false,
      error: "Token invalide",
    } as AuthResponse);
  }
};
