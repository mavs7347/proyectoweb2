import express from 'express';
import WatchingRouter from './watching.route';
import UserRouter from './user.route'
import AuthRouter from './auth.route'

const routerApi = (app) => {
    const router = express.Router();
    app.use('/api/v2', router);
    router.use('/watches', WatchingRouter);
    router.use('/users', UserRouter);
    router.use('/auth', AuthRouter);
}

export default routerApi;