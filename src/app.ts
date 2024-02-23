import express from 'express';
import mongoose/*, { type ConnectOptions } */ from 'mongoose';
import { logErrors, errorHandler, boomErrorHandler } from './middlewares/error.handler';
import routerApi from './routes';
import { config } from './config/config';

const {mongoUri, port} = config;

const app = express();

const connectDB = () => {
    mongoose.connect(mongoUri);
}

app.use(express.json());
routerApi(app);

app.listen(port, () => {
    console.log('Server is running at http://localhost:3010');
    connectDB();
});



app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);