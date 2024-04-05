import { SchemaTypes, Schema, model } from 'mongoose';

const responseSchema = new Schema({
    reviewTitle: {
        type: SchemaTypes.String,
        required: true
    },
    responseContent: {
        type: SchemaTypes.String,
        required: true
    }
});

const Response = model('Response', responseSchema); // posts collection 

export default Response;
// module.exports = Post;