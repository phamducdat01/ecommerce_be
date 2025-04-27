import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import process from 'process';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// init middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// init db
import './db/init.mongodb';
// import './dbs/init.redis'; // nếu dùng redis thì bật lên

// test pub/sub redis
// import './tests/inventory.test';

// import productTest from './tests/product.test';
// productTest.purchaseProduct('product:001', 10);

// import { checkOverload } from './helpers/check.connect';
// checkOverload();

// init routes
// import routes from './routes';
// app.use('/', routes);

// handling error - Not Found
app.use((req: Request, res: Response, next: NextFunction) => {
    const error: any = new Error('Not Found');
    error.status = 404;
    next(error);
});

interface CustomError extends Error {
    status?: number;
    statusCode?: number;
}

// handling error - Other Errors
const errorHandler: ErrorRequestHandler = (error, req: Request, res: Response, next: NextFunction): void => {
    const statusCode = error.status || 500;
    res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        stack: error.stack,
        message: error.message || 'Internal Server Error',
    });

    // Không cần phải trả về gì, chỉ cần gửi response
};

app.use(errorHandler);

// app.use((error: any, req: Request, res: Response, next: NextFunction): void => {
//     const statusCode = error.status || 500;
//     res.status(statusCode).json({
//         status: 'error',
//         code: statusCode,
//         stack: error.stack,
//         message: error.message || 'Internal Server Error',
//     });
// });
export default app;
