import mongoose, { mongo } from 'mongoose'

export interface User extends mongoose.Document {
    name: String,
    contacts: {
        email: String,
        phone: String,
        whatsapp: String
    }
}

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    contacts: {
        type: Object,
        email: {
            type: String
        },
        phone: {
            type: String
        },
        whatsapp: {
            type: String
        }
    }
})

export const User = mongoose.model<User>('User', userSchema)