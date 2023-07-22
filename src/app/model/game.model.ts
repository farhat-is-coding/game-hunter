export interface Game {
    id: number;
    name: string;
    rating: number;
    background_image: string;
    short_screenshots?: {id:number, image: string}[]
}