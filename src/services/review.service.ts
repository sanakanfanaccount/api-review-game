import { ReviewDTO } from "../dto/review.dto";
import { GameDTO } from "../dto/game.dto";
import { Game } from "../models/game.model";
import { Review } from "../models/review.model";
import { notFound } from "../error/NotFoundError";

export class ReviewService {
  public async getAllReviews(): Promise<ReviewDTO[]> {
    return await Review.findAll({
      include: [
        {
          model: Game,
          as: "game",
        },
      ],
    });
  }
}

export const reviewService = new ReviewService();
