import express from 'express';
import { AuditLog } from '../models/auditLog.js';  // Changed import syntax

const router = express.Router();

// Create a new audit log entry
router.post('/', async (req, res) => {
  try {
    const auditLog = new AuditLog(req.body);
    await auditLog.save();
    res.status(201).send(auditLog);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all audit logs in chronological order
router.get('/', async (req, res) => {
  try {
    const logs = await AuditLog.find().sort({ timestamp: 1 });
    res.send(logs);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;