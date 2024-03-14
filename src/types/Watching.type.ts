import type { Model } from "mongoose";
import { User } from './User.type'

export type Watching = {
    id?: string
    serie: string
    temporada: number
    capitulo: number
    duracion?: string
    checkpoint: string
    user: User
}

export type WatchingModel = Model<Watching>