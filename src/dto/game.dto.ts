import { ConsoleDTO } from "./console.dto";

export interface GameDTO {
  id?: number;
  title: string;
  console: ConsoleDTO;
}

export interface Game_CreateDTO {
  title: string;
  console_id : number;
}

export interface Game_UpdateDTO {
  id? : number,
  title: string;
  console_id : number;
}