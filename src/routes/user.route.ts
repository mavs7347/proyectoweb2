import express from 'express';
import { User } from '../types/User.type'
import UserService from '../services/user.service';
import boom from '@hapi/boom'

const router = express.Router();
const service = new UserService();

router.post('/', async (req, res, next) => {
    try {
        const user: User = req.body
        if (!user.email || !user.password || !user.phoneNumber) {
            throw boom.badRequest('User, password and phoneNumber is required')
        }
        const newUser = await service.create(user)
        res.status(201).json({newUser})
    } catch(error) {
        next(error)
    }
});

router.get('/all', async(req, res, next) => {
    try {
        const users = await service.findAll();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const { email } = req.query
        const user = await service.findByEmail(email as string);

        res.status(200).json({user})
    } catch(error) {
        next(error)
    }
})

export default router