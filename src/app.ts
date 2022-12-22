import cookieParser from 'cookie-parser';
import express from 'express';
import actuator = require('express-actuator');
import logger from 'morgan';
import path from 'path';
import config from './config';
import NotificationHousingController from './controllers/NotificationHousingController';

const app = express();
const apiPath = config.apiPath;
const fullApiPath = `${apiPath}/V1/Utilities`;

app.disable('x-powered-by');
app.use(logger('dev', { skip: (req) => req.path === '/management/health' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../static')));

// Configurar cabeceras y cors
app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // NOSONAR
    res.header('Access-Control-Allow-Headers', '*'); // NOSONAR
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'); // NOSONAR
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE'); // NOSONAR
    next(); // NOSONAR
});

// add the controllers you need here
app.use(
    actuator({
        basePath: '/management',
    })
);

app.use(fullApiPath, NotificationHousingController);

export default app;
