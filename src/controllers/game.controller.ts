import { Controller, Get, Post, Delete, Route, Path, Body, Tags, Patch } from "tsoa";
import { GameDTO } from "../dto/game.dto";
import { ReviewDTO } from "../dto/review.dto";

import { gameService } from "../services/game.service";
import { consoleService } from "../services/console.service";
import { Console } from "../models/console.model";
import { notFound } from "../error/NotFoundError";


@Route("games")
@Tags("Games")
export class GameController extends Controller {
  // Récupère tous les jeux
  @Get("/")
  public async getAllGames(): Promise<GameDTO[]> {
    return gameService.getAllGames();
  }

    // Récupère un jeu par ID
    @Get("{id}")
    public async getGameById(id: number): Promise<GameDTO | null> {
      return gameService.getGameById(id);
    }
  
    @Get("{id}/reviews")
    public async getGameReviews(@Path() id: number): Promise<ReviewDTO[] | null> {
      return gameService.getGameReviews(id);
    }
    
    // Crée une nouvelle console
    @Post("/")
    public async createGame(
      @Body() requestBody: GameDTO
    ): Promise<GameDTO | null> {
      const { title, console } = requestBody;

      if(console.id!=undefined){
        const consolecopy = await consoleService.getConsoleById(console.id)
        if(consolecopy !=null){
          return gameService.createGame(title, consolecopy);
        }
      }
      return notFound("Console introuvable. ")
    }
  
    // Met à jour une console par ID
    @Patch("{id}")
    public async updateConsole(
      @Path() id: number,
      @Body() requestBody: GameDTO
    ): Promise<GameDTO | null> {
      const { title, console} = requestBody;
      if(console.id!=undefined){
        const consolecopy = await consoleService.getConsoleById(console.id)
        if(consolecopy !=null){
          return gameService.updateGame(id,title, consolecopy);
        }
      }
      return notFound("Console introuvable. ")
    }

    
    // Supprime un jeu par ID
    @Delete("{id}")
    public async deleteGame(@Path() id: number): Promise<void> {
      await gameService.deleteGame(id);
    }
    
}