import { notFound } from "../error/NotFoundError";
import { Console } from "../models/console.model";

export class ConsoleService {

  // Récupère toutes les consoles
  public async getAllConsoles(): Promise<Console[]> {
    return await Console.findAll();
  }

  // Récupère une console par ID
  public async getConsoleById(id: number): Promise<Console | null> {
   const console = await Console.findByPk(id);
   if(console == null){
    return notFound("ERREUR !!")
   }
   return console
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
    const console = await Console.findByPk(id);
    if (console) {
      console.destroy();
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