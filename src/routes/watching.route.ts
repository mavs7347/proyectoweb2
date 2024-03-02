import express from 'express';
import { Watching } from '../types/Watching.type';
import WatchingService from '../services/watching.service';
import passport from 'passport';
import { UserRequestType } from '../types/User.type';

const router = express.Router();
const service = new WatchingService();


router.post('/', passport.authenticate('jwt', { session: false}), async(req, res) => {
    // const watching: Watching = req.body;

    // const newWatching = await service.create(watching);
    
    // res.status(201).json(newWatching);
    
    const watching: Watching = {
            serie: 'Dark',
            temporada: 2,
            capitulo: 4,
            duracion: '44:35',
            checkpoint: '12:32'
        }
        
        const newWatching = await service.create(watching);
        
        res.status(201).json(newWatching);
});

router.get('/all', passport.authenticate('jwt', { session: false}), async(req: UserRequestType, res, next) => {
    try {
        const { user } = req;
        console.log(user);
        const watches = await service.findAll();
        res.status(200).json(watches);
    } catch (error) {
        next(error);
    }
    
    // const watches = await categoryService.findAll();
    
    // res.status(200).json(watches);
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