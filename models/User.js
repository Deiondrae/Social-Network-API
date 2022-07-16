const { Schema, model } = require("mongoose");
var isEmail = require("validator");

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true, 
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [isEmail, "invalid email"]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "thought"
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "user"
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

UserSchema.virtual("friendcount").get(function() {
    return this.friends.length;
});
const User = model("User", UserSchema);

module.exports = User;
