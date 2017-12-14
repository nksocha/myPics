var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var MyPicSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    mypic: { type: String, required: true },
    description: { type: String },
    dateCreated: {type: Date, default: Date.now},
    file: {filename: String, originalName: String, dateUploaded: Date},
    galleryId: { type: Schema.Types.ObjectId, required: true }
    
});

module.exports = Mongoose.model('Mypic', MyPicSchema);