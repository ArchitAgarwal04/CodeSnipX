import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    clerkUserId: { type:String, unique: true, required: true},
    emailAddress: { type:String, required:true},
});

const User = models?.User || model("User", UserSchema);

export default User;