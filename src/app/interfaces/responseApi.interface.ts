import { Movie } from "./movie.interface"

export interface ResponseAPI {
    Response: string,
    Search: Array<Movie>,
    totalResults: string,
    Error?: string
}