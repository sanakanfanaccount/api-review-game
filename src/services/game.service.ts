import { GameDTO } from "../dto/game.dto";
import { Console } from "../models/console.model";
import { Game } from "../models/game.model";
import { notFound } from "../error/NotFoundError";

export class GameService {
  public async getAllGames(): Promise<GameDTO[]> {
    return await Game.findAll({
      include: [
        {
          model: Console,
          as: "console",
        },
      ],
    });
  }
  
  // Récupère un jeu par ID
public async getGameById(id: number): Promise<Game | null> {
  const game = await Game.findByPk(id);
  if(game == null){
   return notFound("Jeu introuvable. ")
  }
  return game
 }
 // Crée un nouveau jeu
 public async createGame(
  title: string,
  console: Console
): Promise<GameDTO | null> {
  const game = await Game.create({ title: title, console_id : console.id, console : console});
  return game;
}

  // Met à jour un jeu
  public async updateGame(
    id: number,
    title: string,
    console: Console
  ): Promise<Game | null> {
    const game = await Game.findByPk(id);
    if (game!= null) {
      if (title) game.title = title;
      if (console) {
        game.console = console;
        game.console_id = console.id;
      } 
      await game.save();
      await console.save();   
      return game;
    }
    return notFound("Console introuvable. ")
  }

}

export const gameService = new GameService();
