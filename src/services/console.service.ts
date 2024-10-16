import { not } from "joi";
import { notFound } from "../error/NotFoundError";
import { Console } from "../models/console.model";
import { Game } from "../models/game.model";
import { Review } from "../models/review.model";
import { Sequelize } from "sequelize";
import sequelize from "sequelize";
import { gameService } from "./game.service";

export class ConsoleService {

  // Récupère toutes les consoles
  public async getAllConsoles(): Promise<Console[]> {
    return await Console.findAll();
  }

  // Récupère une console par ID
  public async getConsoleById(id: number): Promise<Console | null> {
   const console = await Console.findByPk(id);
   if(console == null){
    return notFound("Console introuvable ")
   }
   return console
  }

  public async getConsoleGames(id: number): Promise<Game[] | null> {
    const console = await Console.findByPk(id);
    if(console == null){
     return notFound("Console introuvable")
    }
    else{
      const games =await Game.findAll({where : {console_id : id}})
      return games;
    }
   }

  // Crée une nouvelle console
  public async createConsole(
    name: string,
    manufacturer: string
  ): Promise<Console> {

    const console = await Console.create({ name: name, manufacturer: manufacturer });
    return console;
  }

  // Supprime une console par ID
  public async deleteConsole(id: number): Promise<void> {
    const Op = require('sequelize').Op

    const console = await Console.findByPk(id);
    if (console) {

      const games =  await Game.findAll({
        attributes:['id'],
        where:{console_id : id}
      })

      let  games_id:  number[] = [];
      games.forEach((game)=>{
        games_id.push(game.id)
      })

      const {count, rows} = await Review.findAndCountAll({where:{game_id : {[Op.in] :  
        games_id
      }}})

      if(count == 0 && games_id.length ==0){
        console.destroy();
      }else{
        return notFound("Impossible de supprimer la console, elle a des jeux ")
      }
    }else{
    return notFound("Console introuvable. ")
    }
  }

  // Met à jour une console
  public async updateConsole(
    id: number,
    name?: string,
    manufacturer?: string
  ): Promise<Console | null> {
    const console = await Console.findByPk(id);
    if (console!= null) {
      if (name) console.name = name;
      if (manufacturer) console.manufacturer = manufacturer;
      await console.save();
      return console;
    }
    return notFound("Console introuvable. ")
  }
}

export const consoleService = new ConsoleService();

