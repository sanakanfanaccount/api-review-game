import { Controller, Get, Post, Delete, Route, Path, Body, Tags, Patch } from "tsoa";
import { GameDTO } from "../dto/game.dto";
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

    // Récupère une jeu par ID
    @Get("{id}")
    public async getConsoleById(id: number): Promise<GameDTO | null> {
      return gameService.getGameById(id);
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

    /*
    // Supprime une console par ID
    @Delete("{id}")
    public async deleteConsole(@Path() id: number): Promise<void> {
      await consoleService.deleteConsole(id);
    }
    */
}