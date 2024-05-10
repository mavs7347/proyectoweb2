import express from 'express';
import mongoose/*, { type ConnectOptions } */ from 'mongoose';
import { logErrors, errorHandler, boomErrorHandler } from './middlewares/error.handler';
import routerApi from './routes';
import { config } from './config/config';
import passport from 'passport';
import './utils/auth'
import cors from 'cors'

const {mongoUri, port} = config;

const app = express();

const connectDB = () => {
    mongoose.connect(mongoUri);
}

app.use(express.json());
app.use(cors())
app.use(passport.initialize());
routerApi(app);

app.listen(port, () => {
    console.log('Server is running at http://localhost:3010');
    connectDB();
});



app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


//token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWUxYzE5ZDlkYmY4N2YxNjQ1YTY5ODYiLCJpYXQiOjE3MDkzMjgyODV9.aLlllRq220qtydP19TpzDbzikNK7ibXX_Ysy7mCsldI