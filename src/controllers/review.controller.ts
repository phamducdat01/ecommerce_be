import { Request, Response } from 'express';
import { ReviewService } from '../services/review.service';
import { CREATED, OK } from '../core/success.response';

export const createReview = async (req: Request, res: Response) => {
    new CREATED({
        message: "Create new review success!",
        metadata: await ReviewService.createReview(req.body)
    }).send(res);
};

export const getAllReviews = async (_req: Request, res: Response) => {
    new OK({
        message: "Get all reviews success!",
        metadata: await ReviewService.getAllReviews()
    }).send(res);
};

export const getReviewById = async (req: Request, res: Response) => {
    new OK({
        message: "Get review by ID success!",
        metadata: await ReviewService.getReviewById(req.params.reviewId)
    }).send(res);
};

export const getReviewsByProductId = async (req: Request, res: Response) => {
    new OK({
        message: "Get reviews by product ID success!",
        metadata: await ReviewService.getReviewsByProductId(req.params.productId)
    }).send(res);
};

export const updateReview = async (req: Request, res: Response) => {
    new OK({
        message: "Update review success!",
        metadata: await ReviewService.updateReview(req.params.reviewId, req.body)
    }).send(res);
};

export const deleteReview = async (req: Request, res: Response) => {
    new OK({
        message: "Delete review success!",
        metadata: await ReviewService.deleteReview(req.params.reviewId)
    }).send(res);
};