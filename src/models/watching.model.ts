import { Schema, model } from "mongoose";
import { Watching, WatchingModel } from "../types/Watching.type";

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
    }
})

export default model('Watching', Watches)