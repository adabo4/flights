import pkg from 'pg';
const { Pool } = pkg;

export let pool = null;

export function connectDatabase() {
    const isProduction = process.env.NODE_ENV === 'production';

    if (isProduction) {
        // Neon database for production
        pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        });
    } else {
        // Local database for development
        pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASS,
            port: process.env.DB_PORT || 5432,
        });
    }

    pool.connect()
        .then(() => console.log('Connected to PostgreSQL'))
        .catch(err => console.error('Connection error', err.stack));
}