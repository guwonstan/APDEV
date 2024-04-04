import { SchemaTypes, Schema, model } from 'mongoose'; // ES6 syntax
// const { SchemaTypes, Schema, model } = require('mongoose'); // CommonJS (default)

const userSchema = new Schema({
    username: {
        type: SchemaTypes.String,
        required: true,
        unique: true
    },

    password: {
        type: SchemaTypes.String,
        required: true
    },

    bio: {
        type: SchemaTypes.String,
        required: true,
        maxLength: 150
    }

});

const User = model('User', userSchema); // users collection 

export default User;
// module.exports = User;