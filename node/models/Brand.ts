import mongoose, {Schema, Model, Document} from 'mongoose';


const BrandSchema = new Schema({
    name: {
        type: String,
    },
    year: {type: String},
    logo: {
        type: String,
        required: false,
    }
})
export const Brands = mongoose.model('Brand', BrandSchema)