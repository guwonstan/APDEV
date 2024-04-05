import { SchemaTypes, Schema, model } from 'mongoose';

const ownerSchema = new Schema({
    username: {
        type: SchemaTypes.String,
        required: true,
        unique: true
    },
    establishment: {
        type: SchemaTypes.String,
        ref: 'Establishment',
        required: true,
        unique: true
    },
    password: {
        type: SchemaTypes.String,
        required: true
    }
});

const Owner = model('Owner', ownerSchema); // posts collection 

export default Owner;
// module.exports = Post;