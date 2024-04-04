import { SchemaTypes, Schema, model } from 'mongoose';

const responseSchema = new Schema({
    review: {
        type: SchemaTypes.ObjectId,
        ref: 'Review',
        required: true
    },
    response: {
        type: SchemaTypes.String,
        required: true
    }
});

const Response = model('Review', responseSchema); // posts collection 

export default Response;
// module.exports = Post;