import express from 'express';
import {root, slack, health} from '../app';

const router = express.Router();

router.use('/', root);
router.use('/slack', slack);
router.use('/health', health);

export {router};
