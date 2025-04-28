import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Number,
    required: true
  },
  action: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
}, { timestamps: true });

export const AuditLog = mongoose.model('AuditLog', auditLogSchema);