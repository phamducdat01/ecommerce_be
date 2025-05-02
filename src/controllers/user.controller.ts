import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { CREATED, OK } from '../core/success.response';

export const createUser = async (req: Request, res: Response) => {
    new CREATED({
        message: "Create new user success!",
        metadata: await UserService.createUser(req.body)
    }).send(res);
};

export const getAllUsers = async (_req: Request, res: Response) => {
    new OK({
        message: "Get all users success!",
        metadata: await UserService.getAllUsers()
    }).send(res);
};

export const getUserById = async (req: Request, res: Response) => {
    new OK({
        message: "Get user by ID success!",
        metadata: await UserService.getUserById(req.params.userId)
    }).send(res);
};

export const updateUser = async (req: Request, res: Response) => {
    new OK({
        message: "Update user success!",
        metadata: await UserService.updateUser(req.params.userId, req.body)
    }).send(res);
};

export const deleteUser = async (req: Request, res: Response) => {
    new OK({
        message: "Delete user success!",
        metadata: await UserService.deleteUser(req.params.userId)
    }).send(res);
};