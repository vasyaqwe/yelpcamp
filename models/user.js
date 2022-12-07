import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'
const { Schema } = mongoose

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
})
const options = {
    errorMessages: {
        IncorrectPasswordError: 'Incorrect credentials',
        IncorrectUsernameError: 'Incorrect credentials'
    }
}
UserSchema.plugin(passportLocalMongoose, options)

export default mongoose.model('User', UserSchema)