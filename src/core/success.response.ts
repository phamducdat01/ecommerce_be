import { Response } from 'express';
import httpStatusCode from '../utils/httpStatusCode';
const { StatusCodes, ReasonPhrases } = httpStatusCode;

interface SuccessResponseOptions {
    message?: string;
    statusCode?: number;
    reasonStatusCode?: string | number;
    metadata?: object;
}

class SuccessResponse {
    message: any;
    status: number;
    metadata: object;

    constructor({
        message,
        statusCode = StatusCodes.OK,
        reasonStatusCode = ReasonPhrases.OK,
        metadata = {},
    }: SuccessResponseOptions) {
        this.message = !message ? reasonStatusCode : message;
        this.status = statusCode;
        this.metadata = metadata;
    }

    send(res: Response, headers: Record<string, string> = {}): Response {
        return res.status(this.status).json(this);
    }
}

class OK extends SuccessResponse {
    constructor({ message, metadata }: { message?: string; metadata?: object }) {
        super({ message, metadata });
    }
}

class CREATED extends SuccessResponse {
    options: object;

    constructor({
        options = {},
        message,
        statusCode = StatusCodes.CREATED,
        reasonStatusCode = ReasonPhrases.CREATED,
        metadata,
    }: {
        options?: object;
        message?: string;
        statusCode?: number;
        reasonStatusCode?: any;
        metadata?: object;
    }) {
        super({ message, statusCode, reasonStatusCode, metadata });
        this.options = options;
    }
}

export { OK, CREATED, SuccessResponse };
