import type { Model } from "mongoose";

export type Watching = {
    id?: string
    serie: string
    temporada: number
    capitulo: number
    duracion?: string
    checkpoint: string
}

export type WatchingModel = Model<Watching>