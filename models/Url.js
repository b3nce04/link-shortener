import mongoose from 'mongoose';
const { Schema } = mongoose;

const urlSchema = new Schema({
    id: String,
    fullUrl: String,
    clicks: {type: Number, default: 0}
});

const Url = mongoose.model('Url', urlSchema);

export default Url