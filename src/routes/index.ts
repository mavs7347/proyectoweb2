import express from 'express';
import WatchingRouter from './watching.route';

const routerApi = (app) => {
    const router = express.Router();
    app.use('/api/v2', router);
    router.use('/watches', WatchingRouter);
}

export default routerApi;