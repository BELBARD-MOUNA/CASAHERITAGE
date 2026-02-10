import { z } from "zod";

// Validation schemas
export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export const signupSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

// Request/Response types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: "user" | "organizer" | "admin";
  };
  error?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "organizer" | "admin";
}
