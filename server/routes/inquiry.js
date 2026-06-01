import { Router } from 'express';
import {
  createInquiry,
  getAllInquiries,
} from '../controllers/inquiryController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = Router();

router.post('/', createInquiry);
router.get('/', protect, adminOnly, getAllInquiries);

export default router;
