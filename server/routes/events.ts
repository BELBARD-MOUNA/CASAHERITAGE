import { RequestHandler } from "express";
import { EventRegistration, EventRegistrationResponse } from "@shared/api";

// In-memory event registrations storage (replace with MongoDB in production)
const registrations: Map<string, EventRegistration[]> = new Map();

export const handleEventRegistration: RequestHandler = (req, res) => {
  try {
    const { id: eventId } = req.params;
    const { name, email, role, message } = req.body;

    // Validate input
    if (!name || !email || !role) {
      return res.status(400).json({
        success: false,
        error: "Nom, email et statut requis",
      } as EventRegistrationResponse);
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Email invalide",
      } as EventRegistrationResponse);
    }

    // Validate role
    if (!["student", "professional", "other"].includes(role)) {
      return res.status(400).json({
        success: false,
        error: "Statut invalide",
      } as EventRegistrationResponse);
    }

    // Check for duplicate registration
    const eventRegistrations = registrations.get(eventId) || [];
    const isDuplicate = eventRegistrations.some((r) => r.email === email);

    if (isDuplicate) {
      return res.status(409).json({
        success: false,
        error: "Vous êtes déjà inscrit à cet événement",
      } as EventRegistrationResponse);
    }

    // Create registration
    const registration: EventRegistration = {
      id: `reg_${Date.now()}`,
      eventId,
      name,
      email,
      role,
      message,
      registeredAt: new Date(),
    };

    // Store registration
    if (!registrations.has(eventId)) {
      registrations.set(eventId, []);
    }
    registrations.get(eventId)!.push(registration);

    res.status(201).json({
      success: true,
      registration,
    } as EventRegistrationResponse);
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      error: "Erreur serveur lors de l'inscription",
    } as EventRegistrationResponse);
  }
};

export const handleGetEventRegistrations: RequestHandler = (req, res) => {
  try {
    const { id: eventId } = req.params;

    const eventRegistrations = registrations.get(eventId) || [];

    res.json({
      success: true,
      registrations: eventRegistrations,
      count: eventRegistrations.length,
    });
  } catch (error) {
    console.error("Fetch registrations error:", error);
    res.status(500).json({
      success: false,
      error: "Erreur serveur",
    });
  }
};

export const handleGetEventRegistrationsByRole: RequestHandler = (req, res) => {
  try {
    const { id: eventId } = req.params;
    const { role } = req.query;

    if (!role || !["student", "professional", "other"].includes(role as string)) {
      return res.status(400).json({
        success: false,
        error: "Statut invalide",
      });
    }

    const eventRegistrations = registrations.get(eventId) || [];
    const filtered = eventRegistrations.filter((r) => r.role === role);

    res.json({
      success: true,
      registrations: filtered,
      count: filtered.length,
    });
  } catch (error) {
    console.error("Fetch registrations by role error:", error);
    res.status(500).json({
      success: false,
      error: "Erreur serveur",
    });
  }
};

export const handleExportRegistrations: RequestHandler = (req, res) => {
  try {
    const { id: eventId } = req.params;

    const eventRegistrations = registrations.get(eventId) || [];

    // Generate CSV format
    const headers = ["Nom", "Email", "Statut", "Message", "Date d'inscription"];
    const rows = eventRegistrations.map((r) => [
      r.name,
      r.email,
      r.role === "student" ? "Étudiant" : r.role === "professional" ? "Professionnel" : "Autre",
      r.message || "-",
      new Date(r.registeredAt).toLocaleDateString("fr-FR"),
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", `attachment; filename="registrations-${eventId}.csv"`);
    res.send(csv);
  } catch (error) {
    console.error("Export error:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de l'export",
    });
  }
};
