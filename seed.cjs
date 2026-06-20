const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');

const db = new Database('database.sqlite');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'admin',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

async function resetAdmin() {
    const username = 'admin';
    const password = '123'; // Reeeeeally simple for testing
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const existing = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    if (existing) {
        db.prepare('UPDATE users SET password = ? WHERE username = ?').run(hashedPassword, username);
        console.log('Admin paroli yangilandi!');
    } else {
        db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)').run(username, hashedPassword, 'admin');
        console.log('Admin yaratildi!');
    }
    
    console.log('Login:', username);
    console.log('Yangi Parol:', password);
}

resetAdmin().catch(err => console.error(err));
