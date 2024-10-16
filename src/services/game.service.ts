import { GameDTO, Game_CreateDTO, Game_UpdateDTO } from "../dto/game.dto";
import { Console } from "../models/console.model";
import { Game } from "../models/game.model";
import { notFound } from "../error/NotFoundError";
import { Review } from "../models/review.model";

export class GameService {
  public async getAllGames(): Promise<GameDTO[]> {
    return await Game.findAll({
      attributes : ['id', 'title'],
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

 public async getGameReviews(id: number): Promise<Review[] | null> {
  const game = await Game.findByPk(id);
  if(game == null){
   return notFound("Jeu introuvable")
  }
  else{
    const reviews =await Review.findAll({where : {game_id : id}})
    return reviews;
  }
 }

 // Crée un nouveau jeu
 public async createGame(
  title: string,
  console: Console
): Promise<Game_CreateDTO | null> {
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

  // Supprime un jeu par ID
  public async deleteGame(id: number): Promise<void> {
    const game = await Game.findByPk(id);
    if (game) {
      const {count, rows} = await Review.findAndCountAll({where : {game_id : id}})
      if(count == 0){
      game.destroy();
      }else{
        return notFound("Impossible de supprimer le jeu quand il a une ou plusieurs critiques ")
      }
    }
  }
}

export const gameService = new GameService();
