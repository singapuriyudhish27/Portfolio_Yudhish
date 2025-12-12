export async function ensureUsersTable(pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
}

export async function upsertUser(pool, { email, password }) {
  await ensureUsersTable(pool);
  await pool.query(
    `INSERT INTO users (email, password, last_login) VALUES (?, ?, NOW())
     ON DUPLICATE KEY UPDATE password = VALUES(password), last_login = NOW();`,
    [email, password]
  );
}
