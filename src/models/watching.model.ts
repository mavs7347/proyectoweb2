import { Schema, model } from "mongoose";
import { Watching, WatchingModel } from "../types/Watching.type";
import { USER_REFERENCE  } from "./user.model";

export const WATCHING_REFERENCE = 'Watching';

const Watches = new Schema<Watching, WatchingModel>({
    serie: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true
    },
    temporada: {
        type: Number,
        required: true
    },
    capitulo: {
        type: Number,
        required: true
    },
    duracion: {
        type: String,
        required: false,
    },
    checkpoint: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: USER_REFERENCE
    }
})

export default model(WATCHING_REFERENCE, Watches)