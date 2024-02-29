import express from 'express';
import WatchingRouter from './watching.route';
import UserRouter from './user.route'

const routerApi = (app) => {
    const router = express.Router();
    app.use('/api/v2', router);
    router.use('/watches', WatchingRouter);
    router.use('/users', UserRouter);
}

export default routerApi;