const { Router } = require('express');
const router = Router();
const { userRouter } = require('./userRouter');
const { accRouter } = require('./accountRouter');

router.use('/user', userRouter);
router.use('/account', accRouter);

module.exports = {
    router
};