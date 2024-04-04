import { SchemaTypes, Schema, model } from 'mongoose'; // ES6 syntax
// const { SchemaTypes, Schema, model } = require('mongoose'); // CommonJS (default)

const postSchema = new Schema({
    username: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    establishment: {
        type: SchemaTypes.ObjectId,
        ref: 'Establishment',
        required: true
    },
    reviewRating: {
        type: SchemaTypes.Number,
        required: true,
        min: 1,
        max: 5
    },
    reviewTitle: {
        type: SchemaTypes.String,
        required: true
    },
    reviewContent: {
        type: SchemaTypes.String,
        required: true
    },
    lastUpdate: {
        type: SchemaTypes.Date
    }
});

const Review = model('Review', postSchema); // posts collection 

export default Review;
// module.exports = Post;