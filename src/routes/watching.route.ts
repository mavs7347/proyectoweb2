import express from 'express';
import { Watching } from '../types/Watching.type';
import WatchingService from '../services/watching.service';

const router = express.Router();
const service = new WatchingService();


router.post('/', async(req, res) => {
    const watching: Watching = req.body;

    const newWatching = await service.create(watching);
    
    res.status(201).json(newWatching);
    
    // const watching: Watching = {
    //         name: 'Electronics',
    //         description: 'Electronic devices'
    //     }
        
    //     const newWatching = await service.create(watching);
        
    //     res.status(201).json(newWatching);
});

router.get('/all', async(req, res, next) => {
    try {
        const watches = await service.findAll();
        res.status(200).json(watches);
    } catch (error) {
        next(error);
    }
    
    // const watches = await categoryService.findAll();
    
    // res.status(200).json(watches);
});

router.get('/:id', async (req, res, next) => {
    try {
        const watching = await service.findById(req.params.id);
        res.status(200).json(watching);
    } catch (error) {
        next(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const watching = await service.findByName(req.query.name as string)
        res.status(200).json(watching)
    } catch (error) {
        next(error)
    }
})

export default router;