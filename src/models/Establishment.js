import { SchemaTypes, Schema, model } from 'mongoose';

const establishmentSchema = new Schema({
    establishment: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    establishmentRating: {
        type: SchemaTypes.Number,
        required: true,
        min: 1,
        max: 5
    },
    establishmentDescription: {
        type: SchemaTypes.String,
        required: true
    }
});

const Establishment = model('Establishment', establishmentSchema); // posts collection 

export default Establishment;
// module.exports = Post;