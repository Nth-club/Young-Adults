import bcrypt from 'bcryptjs';
import db, { initDb } from '../db.js';

async function createAdmin() {
  initDb();
  
  const username = 'admin';
  const password = 'adminpassword123'; // Hardcoded as requested
  
  const existing: any = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  
  if (existing) {
    console.log('Admin user already exists');
    return;
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const stmt = db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)');
  stmt.run(username, hashedPassword, 'admin');
  
  console.log(`Admin user created: ${username}`);
  console.log(`Password: ${password}`);
}

createAdmin();
