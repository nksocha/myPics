var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var GalleriesSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    galleries: { type: String, required: true },
    description: { type: String },
    dateCreated: {type: Date, default: Date.now}
});

module.exports = Mongoose.model('Galleries', GalleriesSchema);