import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatarUrl: String,
    googleId: String,
    facebookId: String,
    githubId: String
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const model = mongoose.model('User', UserSchema);

export default model;
