import { Schema, model } from "mongoose";
import { User, UserMethods, UserModel } from '../types/User.type'
import { EMAIL_REGEX, PHONE_NUMBER_REGEX } from "../utils/constants";

export const USER_REFERENCE = 'User';

const Users = new Schema<User, UserModel, UserMethods>({
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
        match: [EMAIL_REGEX, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: false,
        trim: true,
        match: [PHONE_NUMBER_REGEX, 'Please enter a valid phone number']
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

Users.methods.toClient = function() {
    return {
        id: this._id as unknown as string,
        name: this.name,
        email: this.email,
        phoneNumber: this.phoneNumber
    }
}

export default model(USER_REFERENCE, Users)