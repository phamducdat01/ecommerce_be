import httpStatusCode from '../utils/httpStatusCode';
const { StatusCodes, ReasonPhrases } = httpStatusCode;

class ErrorResponse extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(
        message: any = ReasonPhrases.CONFLICT,
        statusCode: number = StatusCodes.FORBIDDEN
    ) {
        super(message, statusCode);
    }
}

class BadRequestError extends ErrorResponse {
    constructor(
        message: any = ReasonPhrases.CONFLICT,
        statusCode: number = StatusCodes.FORBIDDEN
    ) {
        super(message, statusCode);
    }
}

class AuthFailureError extends ErrorResponse {
    constructor(
        message: any = ReasonPhrases.UNAUTHORIZED,
        statusCode: number = StatusCodes.UNAUTHORIZED
    ) {
        super(message, statusCode);
    }
}

class NotFoundError extends ErrorResponse {
    constructor(
        message: any = ReasonPhrases.NOT_FOUND,
        statusCode: number = StatusCodes.NOT_FOUND
    ) {
        super(message, statusCode);
    }
}

class ForbiddenError extends ErrorResponse {
    constructor(
        message: any = ReasonPhrases.FORBIDDEN,
        statusCode: number = StatusCodes.FORBIDDEN
    ) {
        super(message, statusCode);
    }
}

/**
 * Lỗi 409 Conflict: Dùng khi có sự xung đột về dữ liệu hoặc yêu cầu.

Lỗi 400 Bad Request: Dùng khi yêu cầu gửi đến không hợp lệ.

Lỗi 401 AuthFailureError: Dùng khi người dùng chưa xác thực.

Lỗi 404 Not Found: Dùng khi không tìm thấy tài nguyên.

Lỗi 403 Forbidden: Dùng khi người dùng không có quyền truy cập vào tài nguyên dù đã xác thực.
 */

export {
    ConflictRequestError,
    BadRequestError,
    AuthFailureError,
    NotFoundError,
    ForbiddenError,
};
