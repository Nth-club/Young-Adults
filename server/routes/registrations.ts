import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const router = express.Router();
const JWT_SECRET = 'young_adults_secret_key_2026';

// Middleware to verify admin
const authMiddleware = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admins only' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Create registration (Public)
router.post('/', (req, res) => {
  try {
    const { name, phone, course, branch } = req.body;
    
    if (!name || !phone || !course || !branch) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    const stmt = db.prepare('INSERT INTO registrations (name, phone, course, branch) VALUES (?, ?, ?, ?)');
    const result = stmt.run(name, phone, course, branch);

    res.status(201).json({ id: result.lastInsertRowid, message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating registration', error: error instanceof Error ? error.message : String(error) });
  }
});

// List registrations (Admin only)
router.get('/', authMiddleware, (req, res) => {
  try {
    const registrations = db.prepare('SELECT * FROM registrations ORDER BY createdAt DESC').all();
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching registrations', error: error instanceof Error ? error.message : String(error) });
  }
});

// Update status (Admin only)
router.patch('/:id', authMiddleware, (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const stmt = db.prepare('UPDATE registrations SET status = ? WHERE id = ?');
    stmt.run(status, id);

    res.json({ message: 'Status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating status', error: error instanceof Error ? error.message : String(error) });
  }
});

// Delete (Admin only)
router.delete('/:id', authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const stmt = db.prepare('DELETE FROM registrations WHERE id = ?');
    stmt.run(id);

    res.json({ message: 'Registration deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting registration', error: error instanceof Error ? error.message : String(error) });
  }
});

export default router;
