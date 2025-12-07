// src/db.ts
import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // For Supabase with SSL, you might need:
  // ssl: { rejectUnauthorized: false }
});
