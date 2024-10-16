import { Controller, Get, Post, Delete, Route, Path, Body, Tags, Patch } from "tsoa";
import { GameDTO } from "../dto/game.dto";
import { gameService } from "../services/game.service";
import { reviewService } from "../services/review.service";
import { Game } from "../models/game.model";
import { notFound } from "../error/NotFoundError";
import { ReviewDTO, Review_CreateDTO, Review_UpdateDTO, Review_GetDTO } from "../dto/review.dto";

@Route("reviews")
@Tags("Reviews")
export class ReviewController extends Controller {
// Récupère toutes les critiques
@Get("/")
public async getAllReviews(): Promise<Review_GetDTO[]> {
  return reviewService.getAllReviews();
}

// Récupère une critique de jeu par ID
@Get("{id}")
public async getReviewById(id: number): Promise<Review_GetDTO | null> {
  return reviewService.getReviewById(id);
}

// Crée une nouvelle review
@Post("/")
public async createGame(
  @Body() requestBody: Review_CreateDTO
): Promise<Review_CreateDTO | null> {
  const { rating, review_text, game_id } = requestBody;

  if(game_id!=undefined){
    const gamecopy = await gameService.getGameById(game_id)
    if(gamecopy !=null){
      return reviewService.createReview(rating, review_text, gamecopy);
    }
  }
  return notFound("Jeu introuvable. ")
}

// Met à jour une console par ID
@Patch("{id}")
public async updategame(
  @Path() id: number,
  @Body() requestBody: Review_UpdateDTO
): Promise<Review_UpdateDTO | null> {
  const { rating, review_text, game_id} = requestBody;
  if(game_id!=undefined){
    const gamecopy = await gameService.getGameById(game_id)
    if(gamecopy !=null){
      return reviewService.updateReview(id, rating, review_text, gamecopy);
    }
  }
  return notFound("Jeu introuvable. ")
}

// Supprime une critique par ID
@Delete("{id}")
public async deleteReview(@Path() id: number): Promise<void> {
  await reviewService.deleteReview(id);
}
}
