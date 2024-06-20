import { Router } from 'express';
import { ping, submit, read,update,remove,search } from '../controllers/submissionController';

const router = Router();

router.get('/ping', ping);
router.post('/submit', submit);
router.get('/read', read);
router.put('/update', update);
router.delete('/delete', remove);
router.get('/search', search);

export default router;
