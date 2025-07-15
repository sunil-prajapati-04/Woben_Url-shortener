import express from 'express';
import { urlShortener, getRedirectOriginalUrl, getUrl } from '../controllers/url.controller.js';
import { isAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/urlShort',urlShortener);
router.get('/:shortId',getRedirectOriginalUrl);
router.get('/:id',isAuth,getUrl);

export default router;