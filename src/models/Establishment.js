import { SchemaTypes, Schema, model } from 'mongoose';

const establishmentSchema = new Schema({
    establishment: {
        type: SchemaTypes.String,
        unique: true,
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
    },
    establishmentURL: {
        type: SchemaTypes.String,
        required: true
    },
    establishmentIMG: {
        type: SchemaTypes.String,
        required: true
    }
});

const Establishment = model('Establishment', establishmentSchema); // posts collection 

export default Establishment;
// module.exports = Post;