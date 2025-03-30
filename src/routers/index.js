import express from 'express';
import contactsRouter from './contacts.js';
import authRouter from './auth.js';
import { UPLOAD_DIR } from '../constants/index.js';

const router = express.Router();

router.use('/contacts', contactsRouter);
router.use('/auth', authRouter);
router.use('/uploads', express.static(UPLOAD_DIR));

export default router;
