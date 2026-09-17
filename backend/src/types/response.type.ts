/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Type for auth response
 * @param { string } fullName - The full name of the user
 * @param { string } email - The email of the user
 * @param { string } role - The role of the user
 * @param { string } accessToken - The access token of the user
 * @param { string } refreshToken - The refresh token of the user
 */
export interface AuthResponse {
  user: {
    fullName: string;
    email: string;
    role: string;
  };
  accessToken: string;
  refreshToken: string;
}
