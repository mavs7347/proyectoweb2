import { Schema, model } from "mongoose";
import { User, UserModel } from '../types/User.type'
import { EMAIL_REGEX, PHONE_NUMBER_REGEX } from "../utils/auth/strategies/constants";

const Users = new Schema<User, UserModel>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
        // match: [EMAIL_REGEX, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        // match: [PHONE_NUMBER_REGEX, 'Please enter a valid phone number']
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    lastModified: {
        type: Date,
        default: () => Date.now()
    }
})

export default model('User', Users)