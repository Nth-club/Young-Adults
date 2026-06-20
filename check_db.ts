import Database from 'better-sqlite3';
const db = new Database('database.sqlite');
const users = db.prepare('SELECT username, role FROM users').all();
console.log('Users in database:', users);
