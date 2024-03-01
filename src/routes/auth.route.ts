import express from 'express';
import passport from 'passport';
import UserService from '../services/user.service';

const router = express.Router();
const service = new UserService();

router.post('/login', passport.authenticate('local', { session: false}), async (req, res, next) => {
    try {
        res.status(200).json({message: "Todo bien (Y)"})
    } catch(error) {
        next(error)
    }
})

export default router