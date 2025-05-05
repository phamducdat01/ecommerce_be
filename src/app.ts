import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import process from 'process';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, // Cho phép gửi cookie
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cookieParser());


// init middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// init db
import './db/init.mongodb';
import { SuccessResponse } from './core/success.response';
import { ForbiddenError } from './core/error.response';
import routes from './routes';
import { sendMail } from './helpers/mail.helper';
// import './dbs/init.redis'; // nếu dùng redis thì bật lên

// test pub/sub redis
// import './tests/inventory.test';

// import productTest from './tests/product.test';
// productTest.purchaseProduct('product:001', 10);

// import { checkOverload } from './helpers/check.connect';
// checkOverload();

app.use('/api', routes);


// const resetLink = `http://${process.env.FRONTEND_URL}`;

// const mailOptions = {
//     to: `phamducdat171102dta@gmail.com`,
//     subject: "Reset your password",
//     html: `Click this link to reset your password: <a href="${resetLink}">${resetLink}</a>`,
// };

// sendMail(mailOptions);

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
