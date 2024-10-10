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
    // Récupère un critique de jeu par ID
    public async getReviewById(id: number): Promise<ReviewDTO | null> {
    const review = await Review.findByPk(id);
    if(review == null){
     return notFound("Critique de jeu introuvable. ")
    }
    return review
   }

    // Crée une critique de jeu
    public async createReview(
    rating: number,
    review_text : string,
    game: Game
  ): Promise<ReviewDTO | null> {
    const review = await Review.create({ rating: rating, review_text: review_text,game_id : game.id, game:game});
    return review;
  }

// Met à jour une critique
    public async updateReview(
        id: number,
        rating: number,
        review_text : string,
        game: Game
      ): Promise<Review | null> {
        const review = await Review.findByPk(id);
        if (review!= null) {
          if (rating) review.rating = rating;
          if (review_text) review.review_text = review_text;
          if (game) {
            review.game = game;
            review.game_id = game.id;
          } 
          await review.save();
          await game.save();   
          return review;
        }
        return notFound("Jeu introuvable. ")
      }

}

export const reviewService = new ReviewService();
