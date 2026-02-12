import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleLogin, handleSignup, handleVerifyToken } from "./routes/auth";
import {
  handleEventRegistration,
  handleGetEventRegistrations,
  handleGetEventRegistrationsByRole,
  handleExportRegistrations,
} from "./routes/events";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Auth routes
  app.post("/api/auth/login", handleLogin);
  app.post("/api/auth/signup", handleSignup);
  app.get("/api/auth/verify", handleVerifyToken);

  // Event routes
  app.post("/api/events/:id/register", handleEventRegistration);
  app.get("/api/events/:id/registrations", handleGetEventRegistrations);
  app.get("/api/events/:id/registrations/role/:role", handleGetEventRegistrationsByRole);
  app.get("/api/events/:id/registrations/export", handleExportRegistrations);

  return app;
}
