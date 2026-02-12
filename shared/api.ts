/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Event Registration Types
 */
export interface EventRegistration {
  id: string;
  eventId: string;
  name: string;
  email: string;
  role: "student" | "professional" | "other";
  message?: string;
  registeredAt: Date;
}

export interface EventRegistrationRequest {
  name: string;
  email: string;
  role: "student" | "professional" | "other";
  message?: string;
}

export interface EventRegistrationResponse {
  success: boolean;
  registration?: EventRegistration;
  error?: string;
}
