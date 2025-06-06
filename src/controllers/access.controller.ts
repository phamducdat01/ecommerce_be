import { Request, Response } from 'express';
import { AccessService } from '../services/access.service';
import { CREATED, OK } from '../core/success.response';


export const signUp = async (req: Request, res: Response) => {
    new CREATED({
        message: "Đăng ký thành công!",
        metadata: await AccessService.signUp(req.body, res)
    }).send(res);
};

export const login = async (req: Request, res: Response) => {
    new OK({
        message: "Đăng nhập thành công!",
        metadata: await AccessService.login(req.body, res)
    }).send(res);
};

export const handlerRefreshToken = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    console.log('refreshToken1111', refreshToken)
    new OK({
        message: "Làm mới token thành công!",
        metadata: await AccessService.handlerRefreshToken(refreshToken)
    }).send(res);
};

export const logout = async (req: Request, res: Response) => {
    new OK({
        message: "Đăng xuất thành công!",
        metadata: await AccessService.logout(req.body.userId)
    }).send(res);
};

export const forgotPassword = async (req: Request, res: Response) => {
    new OK({
        message: "Yêu cầu đặt lại mật khẩu thành công!",
        metadata: await AccessService.forgotPassword(req.body.email)
    }).send(res);
};

export const resetPassword = async (req: Request, res: Response) => {
    new OK({
        message: "Đặt lại mật khẩu thành công!",
        metadata: await AccessService.resetPassword(req.body.resetToken, req.body.newPassword)
    }).send(res);
};