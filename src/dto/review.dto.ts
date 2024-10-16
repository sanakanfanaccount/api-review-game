import { GameDTO } from "./game.dto";

export interface ReviewDTO {
    id?: number;
    rating:number;
    review_text: string;
    game: GameDTO;
}

export interface Review_CreateDTO {
    rating:number;
    review_text: string;
    game_id : number;
}

export interface Review_UpdateDTO {
    id? : number
    rating:number;
    review_text: string;
    game_id : number;
}
export interface Review_GetDTO {
    id? : number
    rating:number;
    review_text: string;
    game : GameDTO
}