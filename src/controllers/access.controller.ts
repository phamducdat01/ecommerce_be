import { Request, Response } from 'express';
import { AccessService } from '../services/access.service';
import { CREATED, OK } from '../core/success.response';

export const signUp = async (req: Request, res: Response) => {
    new CREATED({
        message: "Đăng ký thành công!",
        metadata: await AccessService.signUp(req.body)
    }).send(res);
};

export const login = async (req: Request, res: Response) => {
    new OK({
        message: "Đăng nhập thành công!",
        metadata: await AccessService.login(req.body)
    }).send(res);
};

export const handlerRefreshToken = async (req: Request, res: Response) => {
    new OK({
        message: "Làm mới token thành công!",
        metadata: await AccessService.handlerRefreshToken(req.body.refreshToken)
    }).send(res);
};

export const logout = async (req: Request, res: Response) => {
    new OK({
        message: "Đăng xuất thành công!",
        metadata: await AccessService.logout(req.body.userId)
    }).send(res);
};