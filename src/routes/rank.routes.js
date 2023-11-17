import {Router} from 'express'
import { rankScore, rankScoreTop } from "../controllers/rank.controller.js";
import { authRequired } from '../middlewares/validateToken.js';


const router = Router()

router.post('/post/max/score', authRequired, rankScore);
router.get('/get/top/score', rankScoreTop);


export default router