import express from 'express';
const router = express.Router();
import { generateComplaintText, chatHelp } from '../controllers/complaintController.js';

router.post('/generate', generateComplaintText);
router.post('/chat-help', chatHelp);

export default router; 