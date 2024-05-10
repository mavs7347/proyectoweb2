import express from 'express';
import { Watching } from '../types/Watching.type';
import WatchingService from '../services/watching.service';
import passport from 'passport';
import { User, JwtRequestType } from '../types/User.type';
import { ObjectId } from 'mongoose';

const router = express.Router();
const service = new WatchingService();

router.post('/', passport.authenticate('jwt', { session: false}), async(req: JwtRequestType, res) => {
    const { user: {sub} } = req
    const watching: Watching = req.body;
    
    const newWatching = await service.create(watching, sub as unknown as ObjectId);
    
    res.status(201).json(newWatching);
});

router.get('/all', async(req: JwtRequestType, res, next) => {
    try {
        const { user } = req;
        console.log(user);
        const watches = await service.findAll();
        res.status(200).json(watches);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', passport.authenticate('jwt', { session: false}), async (req, res, next) => {
    try {
        const watching = await service.findById(req.params.id);
        res.status(200).json(watching);
    } catch (error) {
        next(error);
    }
});

router.get('/', passport.authenticate('jwt', { session: false}), async (req, res, next) => {
    try {
        const watching = await service.findByName(req.query.name as string)
        res.status(200).json(watching)
    } catch (error) {
        next(error)
    }
})

export default router;