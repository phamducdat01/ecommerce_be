import { BadRequestError, ConflictRequestError, NotFoundError } from '../core/error.response';
import { IReview, ReviewModel } from '../models/review.model';

export const ReviewService = {
    // Tạo đánh giá mới
    createReview: async (reviewData: IReview) => {
        const existingReview = await ReviewModel.findOne({
            userId: reviewData.userId,
            productId: reviewData.productId
        });
        if (existingReview) throw new ConflictRequestError("Review for this user and product already exists");

        const newReview = await ReviewModel.create(reviewData);
        if (!newReview) throw new BadRequestError("Create new review error");

        return newReview;
    },

    // Cập nhật đánh giá
    updateReview: async (reviewId: string, updateData: Partial<IReview>) => {
        const review = await ReviewModel.findById(reviewId);
        if (!review) throw new NotFoundError("Review not found");

        const updatedReview = await ReviewModel.findByIdAndUpdate(reviewId, updateData, { new: true });
        if (!updatedReview) throw new BadRequestError("Update review error");

        return updatedReview;
    },

    // Xoá đánh giá
    deleteReview: async (reviewId: string) => {
        const review = await ReviewModel.findById(reviewId);
        if (!review) throw new NotFoundError("Review not found");

        await ReviewModel.findByIdAndDelete(reviewId);
        return { message: "Review deleted successfully" };
    },

    // Lấy danh sách tất cả đánh giá
    getAllReviews: async () => {
        const reviews = await ReviewModel.find();
        if (!reviews || reviews.length === 0) throw new NotFoundError("No reviews found");

        return reviews;
    },

    // Lấy đánh giá theo ID
    getReviewById: async (reviewId: string) => {
        const review = await ReviewModel.findById(reviewId);
        if (!review) throw new NotFoundError("Review not found");

        return review;
    },

    // Lấy danh sách đánh giá theo productId
    getReviewsByProductId: async (productId: string) => {
        const reviews = await ReviewModel.find({ productId });
        if (!reviews || reviews.length === 0) throw new NotFoundError("No reviews found for this product");

        return reviews;
    }
};