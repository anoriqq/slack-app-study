import express from 'express';

const router = express.Router();

router.get('/', (req, res, next)=>{
  res.render('index', {title: 'Add to slack'});
})

export {router as root};
