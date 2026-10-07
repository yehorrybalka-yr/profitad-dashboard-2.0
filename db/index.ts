import { attachDatabasePool } from "@vercel/functions";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

function createDb() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is not set");

  // pg already treats sslmode=require as verify-full; saying so explicitly silences its deprecation warning.
  const pool = new Pool({ connectionString: connectionString.replace(/sslmode=require\b/, "sslmode=verify-full") });
  attachDatabasePool(pool);
  return drizzle(pool, { schema });
}

let db: ReturnType<typeof createDb> | null = null;

export function getDb() {
  db ??= createDb();
  return db;
}
