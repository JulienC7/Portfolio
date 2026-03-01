import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;

export async function getPool(): Promise<mysql.Pool> {
  if (pool) {
    return pool;
  }

  pool = mysql.createPool({
    host: process.env.MYSQL_HOST || 'localhost',
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'portfolio_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  return pool;
}

export async function closePool() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}
