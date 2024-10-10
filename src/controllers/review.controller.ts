import { Controller, Get, Post, Delete, Route, Path, Body, Tags, Patch } from "tsoa";
import { GameDTO } from "../dto/game.dto";
import { gameService } from "../services/game.service";
import { reviewService } from "../services/review.service";
import { Game } from "../models/game.model";
import { notFound } from "../error/NotFoundError";
import { ReviewDTO } from "../dto/review.dto";

@Route("reviews")
@Tags("Reviews")
export class ReviewController extends Controller {
// Récupère tous les jeux
@Get("/")
public async getAllReviews(): Promise<ReviewDTO[]> {
  return reviewService.getAllReviews();
}

}
